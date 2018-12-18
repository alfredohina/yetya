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


router.get("/events/:id/myevents", (req, res, next) => {
  events.find({id_user_anunciante:req.user._id})
      .then(myev => {
      res.render("events/myevents", { myev });
    })
    .catch(err => {
      console.log("Error editing profile", err);
      next();
    });
});



 router.get("/events/new", (req, res, next) => {
  res.render("events/new");
});


router.get("/events/:id", (req, res, next) => {
  events.findById(req.params.id).then(ev => {
    res.render("events/show", { ev } );
  })
});

router.get("/events/:id/delete", (req, res, next) => {
  events.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/events"))
    .catch(e => {
      console.log("Error deleting event", e);
      next();
    });
});

router.get("/events/:id/edit", (req, res, next) => {
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


router.post("/events", uploadCloud.single('photo'), (req, res, next) => {
  const event = {
    name: req.body.name,
    capacity: req.body.capacity,
    description: req.body.description,
    id_user_anunciante: req.user._id,
    date: req.body.date,
    price: req.body.price,
    category: req.body.category,
    // imgPath: req.file.url
  };
  events.create(event)
    .then(() => res.redirect("/events"))
    .catch(e => {
      console.log("Error creating event", e);
      res.redirect("/events/new")
    });
});


 router.post("/events/:id", (req, res, next) => {
  const event = {
    name: req.body.name,
    capacity: req.body.capacity,
    description: req.body.description,
    id_user_anunciante: req.user._id,
    date: req.body.date,
    price: req.body.price,
    category: req.body.category
    // rating: req.body.rating,
  };
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