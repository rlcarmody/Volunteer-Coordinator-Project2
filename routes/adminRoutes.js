var db = require("../models");

module.exports = app => {
    //EVENTS
  // POST route for saving a new events
  app.post("/Event", function(req, res) {
    db.Events.create({
      name: req.body.name,
      desription: req.body.desription,
      venue: req.body.venue,
      startime: req.body.startime,
      endtime: req.body.endtime
    }).then(function(addEvent) {
      res.json(addEvent);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

  // DELETE route for deleting events by ID
  app.delete("/Event/:id", function(req, res) {
    db.Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(deleteEvent) {
      res.json(deleteEvent);
    });
  });

  // PUT route for updating Events.
  app.put("/Event", function(req, res) {
    db.Events.update({
      name: req.body.name,
      desription: req.body.desription,
      venue: req.body.venue,
      startime: req.body.startime,
      endtime: req.body.endtime
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(updateEvents) {
      res.json(updateEvents);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

   //USERS
  // POST route for saving a new users
  app.post("/User", function(req, res) {
    db.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickName: req.body.nickName,
        phone: req.body.phone,
        email: req.body.email,
        skills: req.body.skills,
        password: hash
    }).then(function(addUser) {
      res.json(addUser);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

  // DELETE route for deleting users by name
  app.delete("/User/:id", function(req, res) {
    db.Users.destroy({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    }).then(function(deleteUser) {
      res.json(deleteUser);
    });
  });

  // PUT route for updating User.
  app.put("/User", function(req, res) {
    db.Users.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickName: req.body.nickName,
        phone: req.body.phone,
        email: req.body.email,
        skills: req.body.skills,
        password: hash
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(updateUser) {
      res.json(updateUser);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

  // POST route for saving a new users
  app.post("/User", function(req, res) {
    db.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickName: req.body.nickName,
        phone: req.body.phone,
        email: req.body.email,
        skills: req.body.skills,
        password: hash
    }).then(function(addUser) {
      res.json(addUser);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

  // DELETE route for deleting users by name
  app.delete("/User/:id", function(req, res) {
    db.Users.destroy({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    }).then(function(deleteUser) {
      res.json(deleteUser);
    });
  });

  //SHIFTS
  // PUT route for updating User.
  app.put("/Shift", function(req, res) {
    db.Shifts.update({
     
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(updateUser) {
      res.json(updateUser);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

  
  
};
