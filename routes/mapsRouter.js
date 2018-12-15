const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
var Axios = require("axios");

router.get("/home", (req, res, next) => {
  Event.find()
    .then(events => {
      res.render("./maps/home", {events:JSON.stringify(events) } );
    })
    .catch(() => {
      console.log("error al ver los eventos");
    });
});

router.get("/apievents", (req, res, next) => {
  let baseURL =
    "https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json";

  Axios.get(baseURL)
    .then(data => {
      console.log(data.data["@graph"]);
      res.json(data.data["@graph"]);
    })
    .catch((err) => console.log(err));
    
});

module.exports = router;
