const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
var Axios = require("axios");

router.get("/home", (req, res, next) => {
  Event.find()
    .then(events => {
      res.render("./maps/home", { events: JSON.stringify(events) });
    })
    .catch(() => {
      console.log("error al ver los eventos");
    });
});

router.post("/apievents", (req, res, next) => {
  const {latitud,longitud} = req.body;
  console.log('Esta llegando al back')

    console.log(req.body.latitud); 

  let baseURL =
  `https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json`;
  //filtro de 1 KM
  //?latitud=${latitud}&longitud=${longitud}&distancia=1000

  let baseURLfiltro =
  `https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json?latitud=${latitud}&longitud=${longitud}&distancia=1000`;
  //filtro de 1 KM

  Axios.get(baseURL)
    .then(data => {
      //console.log(data.data["@graph"]);
      res.json(data.data["@graph"]);
    })
    .catch(r => console.log(r));
});



module.exports = router;