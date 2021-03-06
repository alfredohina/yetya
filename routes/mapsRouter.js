const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
var Axios = require("axios");

router.get("/home", (req, res, next) => {
  const today = Date.now()
  const tomorrow = today + 86400
  console.log(today , tomorrow)
  Event.find( { date : { $gte: today } })

  // Event.find()
    .then(events => {
      let evmap = events
      res.render("./maps/home", { events: JSON.stringify(events), layout:'mapLayout', evmap});
      // res.render("./maps/home", { events: JSON.stringify(events), layout:'mapLayout'});
    })
    .catch(() => {
      console.log("error al ver los eventos");
    });
});

router.post("/apievents", (req, res, next) => {
  const {latitud,longitud} = req.body;


  // let baseURL =
  // `https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json`;
  //filtro de 1 KM
  //?latitud=${latitud}&longitud=${longitud}&distancia=1000

  let baseURLfiltro =
  `https://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json?latitud=${latitud}&longitud=${longitud}&distancia=1000`;
  //filtro de 1 KM
  Axios.get(baseURLfiltro)
    .then(data => {
      //console.log(data.data["@graph"]);
      res.json(data.data["@graph"]);
    })
    .catch(r => console.log('Errores en el Back'));
});



module.exports = router;