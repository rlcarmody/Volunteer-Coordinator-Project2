const db = require("../models");
const sec = require("../auth");

module.exports = app => {
  // Get all examples
  app.get("/api/examples", (req, res) => {
    db.Example.findAll({}).then(dbExamples => {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", (req, res) => {
    db.Example.create(req.body).then(dbExample => {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", (req, res) => {
    db.Example.destroy({ where: { id: req.params.id } }).then(dbExample => {
      res.json(dbExample);
    });
  });

  app.post("/api/register", (req, res) => {
    if (sec.isValidPassword(req.body.password)) {
      sec.hashPassword(req.body.password, (err, hash) => {
        if (err) res.status(500).end();
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
            console.log(error);
            res.status(400).end();
          });
      });
    } else {
      res.status(400).end();
    }
  });
};
