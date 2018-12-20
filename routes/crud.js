require('dotenv').config();

const express = require("express");
const router = express.Router();
const events = require("../models/Event");
const {isLoggedIn} = require('../middlewares/isLogged');
const mongoose = require("mongoose");
const uploadCloud = require('../config/cloudinary');

router.get("/events", [isLoggedIn('/auth/login')], (req, res, next) => {
  var useradmin = false;
  if (req.user.role === "anunciante") {
    useradmin = true;
  }
  events.find()
    .then(event => {
      res.render("events/index", { event, useradmin });
    })
    .catch(e => {
      console.log("Error on router get event", e);
      next();
    });
});


router.get("/events/:id/myevents", isLoggedIn('/auth/login'), (req, res, next) => {
  events.find({id_user_anunciante:req.user._id, date: { $gt: Date.now() } })
      .then(myev => {
        console.log(Date.now('YYYY/MM/D'), "y", myev[0].date.getTime() )
      res.render("events/myevents", { myev });
    })
    .catch(err => {
      console.log("Error editing profile", err);
      next();
    });
});



 router.get("/events/new", isLoggedIn('/auth/login'), (req, res, next) => {
  res.render("events/new");
});


router.get("/events/:id", isLoggedIn('/auth/login'), (req, res, next) => {
  events.findById(req.params.id).then(ev => {
    const date = ev.date.getTime();
    console.log(date)
    res.render("events/show", { ev } );
  })
});

router.get("/events/:id/delete", isLoggedIn('/auth/login'), (req, res, next) => {
  events.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/events"))
    .catch(e => {
      console.log("Error deleting event", e);
      next();
    });
});

router.get("/events/:id/edit", isLoggedIn('/auth/login'), (req, res, next) => {
  events.findById(req.params.id)
    .then(ev => {
      console.log(ev)
      res.render("events/edit", { ev });

    })
    .catch(err => {
      console.log("Error editing event", err);
      next();
    });
});


router.post("/events", isLoggedIn('/auth/login'), uploadCloud.single('photo'), (req, res, next) => {
  const event = {
    name: req.body.name,
    capacity: req.body.capacity,
    description: req.body.description,
    id_user_anunciante: req.user._id,
    date: req.body.date,
    price: req.body.price,
    category: req.body.category
  };
  if (req.file) {
    event.imgPath = req.file.url
  }
  events.create(event)
    .then(() => res.redirect("/events"))
    .catch(e => {
      console.log("Error creating event", e);
      res.redirect("/events/new")
    });
});


 router.post("/events/:id", isLoggedIn('/auth/login'), uploadCloud.single('photo'), (req, res, next) => {
  const event = {
      id_user_anunciante: req.user._id,
      category: req.body.category
  };
  if (req.file) {
    event.imgPath = req.file.url
  }
  if (req.body.name) {
    event.name = req.body.name
  }
  if (req.body.capacity) {
    event.capacity = req.body.capacity
  }
  if (req.body.description) {
    event.description = req.body.description
  }
  if (req.body.date) {
    event.date = req.body.date
  }
  if (req.body.price) {
    event.price = req.body.price
  }
  events.findByIdAndUpdate(req.params.id, event)
    .then(() => res.redirect("/events/"))
    .catch(e => console.log("Error updating event", e));
});


// router.post("/myevents/:id", (req, res, next) => {
//   const event = {
    
//   };
//   events.findByIdAndUpdate(req.params.id, event)
//     .then(() => res.redirect("/events/:id/myevents/"))
//     .catch(e => console.log("Error updating event", e));
// });



module.exports = router;