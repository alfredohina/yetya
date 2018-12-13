const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const

router.get("/home", (req, res, next) => {
  Event.find()
    .then(events => {
      console.log(`Estas son los eventos ${events}`);
      res.render("./maps/home", { events: JSON.stringify(events) });
    })
    .catch(() => {
      console.log("error al ver los eventos");
    });
});

router.get("/apievents", (req, res, next) => {
  let baseURL =
    "https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json";

  axios.get(baseURL).then(data => res.send(JSON.stringify(data)));
});

module.exports = router;
