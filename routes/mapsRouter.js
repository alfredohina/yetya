const express = require("express");
const router = express.Router();
const Event = require("../models/Event");


router.get('/home', (req, res, next) => {
  console.log('Esta entrado aqui')
  Event.find()
    .then(events => {
      console.log(`Estas son las movies ${events}`);
      res.render("./maps/home",{events:JSON.stringify(events)});
    })
    .catch(() => {console.log("error al ver los eventos" )})
  
});


module.exports = router;