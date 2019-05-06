const db = require("./models");
const sec = require("./auth");

const seeds = () => {
  const users = [
    {
      firstName: "Destany",
      lastName: "Fay",
      email: "Deontae_Oberbrunner21@example.com",
      skills: "copy hacking",
      phone: "4391616843",
      password: "j7bgCMnAaqQB6TQ",
      nickName: ""
    },
    {
      firstName: "Vanessa",
      lastName: "O'Hara",
      email: "Gladyce59@example.com",
      skills: "viral communities",
      phone: "4413138826",
      password: "ww3O4M17aPm7yM5",
      nickName: ""
    },
    {
      firstName: "Carli",
      lastName: "Johnson",
      email: "Coy_Tillman84@example.com",
      skills: "harness",
      phone: "8737360860",
      password: "4BnVs0SO3Tm8ozS",
      nickName: ""
    },
    {
      firstName: "Pierre",
      lastName: "Robel",
      email: "Werner40@example.com",
      skills: "New Hampshire",
      phone: "8882099606",
      password: "eR0F1SiYmerieZy",
      nickName: ""
    },
    {
      firstName: "Precious",
      lastName: "Daugherty",
      email: "Dexter.Nikolaus@example.com",
      skills: "Extension",
      phone: "7281665723",
      password: "iG0Kswq8Ogrp_4c",
      nickName: ""
    }
  ];

  const Events = [
    {
      name: "deleniti et ipsa",
      description:
        "Voluptas ut tempore et aspernatur. Rerum rerum earum nisi est molestiae. Quo eligendi harum omnis excepturi sed ipsum. Rerum sint possimus quas dolores sint non sunt expedita iusto. Quae ex quia nostrum facilis autem magnam id ut saepe.",
      venue: "Kreigertown",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 00:00:00"
    },
    {
      name: "pariatur iusto ea",
      description:
        "Autem quia ut dolor itaque aut excepturi maxime. Error quidem deserunt pariatur impedit illo omnis voluptatem dicta consequatur. Pariatur harum vitae corporis saepe rem quo dolor ipsa.",
      venue: "Kuvalisland",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 00:00:00"
    },
    {
      name: "dolores tenetur labore",
      description:
        "Consequatur id adipisci nisi est vero facere. Aut debitis aut qui quidem architecto omnis suscipit voluptas. Voluptatem et sunt aperiam temporibus cupiditate placeat. Iste totam voluptatum saepe accusamus reiciendis quis omnis error. Ipsa et labore eum magni odio.",
      venue: "Port Martine",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 00:00:00"
    },
    {
      name: "iste eligendi earum",
      description:
        "Rerum debitis ab maiores. Recusandae et velit enim. Dolorum tempore pariatur laudantium sint et minima saepe. Culpa magni id repellat cupiditate quis voluptatem voluptatem. Mollitia nihil aut aperiam labore.",
      venue: "Alvahberg",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 00:00:00"
    }
  ];

  const Shifts = [
    {
      position: "repellendus",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 03:00:00"
    },
    {
      position: "dolor",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 03:00:00"
    },
    {
      position: "consequatur",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 03:00:00"
    },
    {
      position: "magni",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 03:00:00"
    },
    {
      position: "voluptas",
      startTime: "2019-05-03 00:00:00",
      endTime: "2019-05-03 03:00:00"
    }
  ];
  /* eslint no-param-reassign: ["error", { "props": false }] */
  users.forEach(item => {
    sec.hashPassword(item.password, (err, hash) => {
      item.password = hash;
      db.User.create(item);
    });
  });
  db.Event.bulkCreate(Events).then(events => {
    events.forEach(event => {
      Shifts.forEach(shift => {
        shift.EventId = event.id;
        db.Shift.create(shift).then(result => {
          const UserShifts = [
            { ShiftId: result.id },
            { ShiftId: result.id },
            { ShiftId: result.id }
          ];
          db.User_Shift.bulkCreate(UserShifts);
        });
      });
    });
  });
};

module.exports = seeds;
