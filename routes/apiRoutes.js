const db = require("../models");
const sec = require("../auth");

module.exports = app => {
  app.get("/api/users", (req, res) => {
    const user = sec.authorize.verifyToken(req.cookies);
    return user ? res.json(user) : res.status(401).end();
  });

  app.post("/api/login", (req, res) => {
    db.User.findOne({ where: { email: req.body.email.trim() } }).then(user => {
      if (user) {
        user.authenticate(req.body.password.trim()).then(isCorrectPassword => {
          if (isCorrectPassword) {
            const { id, email, isStaff } = user;
            const token = sec.authorize.generateToken(email, isStaff, id);
            res
              .cookie("authToken", token, {
                maxAge: 3600000,
                httpOnly: true,
                sameSite: true
              })
              .send("Success");
          } else {
            res.status(401).send("Invalid User Name or Password");
          }
        });
      } else {
        res.status(401).send("Invalid User Name or Password");
      }
    });
  });

  app.post("/api/register", (req, res) => {
    if (sec.isValidPassword(req.body.userPassword)) {
      sec.hashPassword(req.body.userPassword.trim(), (err, hash) => {
        if (err) {
          res.status(500).end();
        }
        const newUserRequest = {
          firstName: req.body.userFirstName.trim(),
          lastName: req.body.userLastName.trim(),
          nickName: req.body.userNickName.trim(),
          phone: req.body.userPhone.replace(/[^0-9]/, "").trim(),
          email: req.body.userEmail.trim(),
          skills: req.body.userSkills.trim(),
          password: hash
        };
        db.User.create(newUserRequest)
          .then(user => {
            const token = sec.authorize.generateToken(
              user.id,
              user.email,
              user.isStaff
            );
            res
              .cookie("authToken", token, {
                maxAge: 3600000,
                httpOnly: true,
                sameSite: true
              })
              .cookie("userName", user.nickName || user.firstName, {
                maxAge: 3600000
              })
              .send("Success");
          })
          .catch(error => {
            console.log(`error from line 66 apiRoutes: ${error}`);
            res.status(400).end();
          });
      });
    } else {
      res.status(400).end();
    }
  });
  // Example route that gets all Events, the shifts and the user shifts and returns as json
  app.get("/api/events", (req, res) => {
    db.Event.findAll({
      include: {
        model: db.Shift,
        order: [["startTime", "DESC"]],
        include: {
          model: db.User_Shift,
          include: {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "nickName"]
          }
        }
      }
    }).then(results => {
      const hbArray = results.map(event => {
        const shifts = [];
        event.Shifts.forEach(shift => {
          shift.User_Shifts.forEach(userShift => {
            const newShift = {
              position: shift.position,
              startTime: shift.startTime,
              endTime: shift.endTime,
              shiftId: userShift.id,
              checkedIn: userShift.checkedIn,
              checkedOut: userShift.checkedOut,
              userId: userShift.UserId
            };
            if (newShift.userId) {
              newShift.firstName = userShift.User.firstName;
              newShift.lastName = userShift.User.lastName;
              newShift.nickName = userShift.User.nickName;
            }
            shifts.push(newShift);
          });
        });
        return {
          eventId: event.id,
          eventName: event.name,
          eventStart: event.startTime,
          eventEnd: event.endTime,
          eventShifts: shifts
        };
      });
      res.json(hbArray);
    });
  });

  app.put("/api/admin/:checktype", (req, res) => {
    const user = sec.authorize.verifyToken(req.cookies);
    if (user && user.isStaff) {
      const updateParams = {};
      updateParams[req.params.checktype] = true;
      db.User_Shift.update(updateParams, { where: { id: req.body.id } }).then(
        results => {
          res.json(results);
        }
      );
    } else {
      res.status(401).end();
    }
  });
};
