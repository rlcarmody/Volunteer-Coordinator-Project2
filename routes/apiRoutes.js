const db = require("../models");
const sec = require("../auth");

module.exports = app => {
  app.get("/api/users", (req, res) => {
    const user = sec.authorize.verifyToken(req.headers);
    return user ? res.json(user) : res.status(401).end();
  });

  app.post("/api/login", (req, res) => {
    db.User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) {
        user.authenticate(req.body.password).then(isCorrectPassword => {
          if (isCorrectPassword) {
            const { id, email, isStaff } = user;
            const token = sec.authorize.generateToken(email, isStaff, id);
            res.json({ token });
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
    if (sec.isValidPassword(req.body.password)) {
      sec.hashPassword(req.body.password, (err, hash) => {
        if (err) {
          res.status(500).end();
        }
        const newUserRequest = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nickName: req.body.nickName,
          phone: req.body.phone,
          email: req.body.email,
          skills: req.body.skills,
          password: hash
        };
        db.User.create(newUserRequest)
          .then(user => {
            const token = sec.authorize.generateToken(
              user.id,
              user.email,
              user.isStaff
            );
            res.json({ token });
          })
          .catch(error => {
            console.log(error.message);
            res.status(400).end();
          });
      });
    } else {
      res.status(400).end();
    }
  });
};
