const express = require("express");
const router = express.Router();
const Event = require("../models/Event");


router.get('/home', (req, res, next) => {
  Event.find()
    .then(events => {
      console.log(`Estas son los eventos ${events}`);
      res.render("./maps/home",{events:JSON.stringify(events)});
    })
    .catch(() => {console.log("error al ver los eventos" )})
  
});


module.exports = router;