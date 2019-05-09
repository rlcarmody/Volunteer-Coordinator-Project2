var db = require("../models");

module.exports = app => {
  //EVENTS
  // POST route for saving a new events

  app.post("/Event", function(req, res) {
    db.Event.create({
      name: req.body.name,
      description: req.body.description,
      venue: req.body.venue,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    }).then(function(addEvent) {
      res.json(addEvent);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

  // DELETE route for deleting events by ID
  app.delete("/Event/:id", function(req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(deleteEvent) {
      res.json(deleteEvent);
    });
  });

  // PUT route for updating Events.
  app.put("/Event", function(req, res) {
    db.Event.update({
      name: req.body.name,
      desription: req.body.desription,
      venue: req.body.venue,
      startTime: req.body.startTime,
      endTime: req.body.endTime
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
    db.User.create({
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
    db.User.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(deleteUser) {
      res.json(deleteUser);
    });
  });

  // PUT route for updating User.
  app.put("/User", function(req, res) {
    db.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickName: req.body.nickName,
        phone: req.body.phone,
        email: req.body.email,
        skills: req.body.skills
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

  //SHIFTS
  // POST route for saving a new shifts
  app.post("/Shift", function(req, res) {
    db.Shift.create({
        id: req.body.id,
        eventID: req.body.eventID,
        position: req.body.position,
        startTime: req.body.startTime,
        endTime: req.body.endTime

    }).then(function(addShift) {
      res.json(addShift);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

  // DELETE route for deleting Shift by ID
  app.delete("/Shift/:id", function(req, res) {
    db.Shift.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(deleteShift) {
      res.json(deleteShift);
    });
  });


  // PUT route for updating Shift.
  app.put("/Shift", function(req, res) {
    db.Shift.update({
      eventID: req.body.eventID,
      position: req.body.position,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    }, {
      where: {
        id: req.body.id,
      }
    }).then(function(updateShift) {
      res.json(updateShift);
    })
      .catch(function(err) {
        res.json(err);
    });
  });

  
  
};
