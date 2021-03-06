// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').load();
require('dotenv').config();
const mongoose = require("mongoose");
const Event = require("../models/Event");

mongoose
  .connect(
    process.env.DBURL,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let events = [
  {
    name: "El malabarista niño!!",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcac",
    location: { type: "Point", coordinates: [40.4045385, -3.6988189] },
    rating: 8,
    description: "Me bajo al parque y me hago el pino un rato",
    capacity: 10,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcab", hasCome: true }],
    date: new Date(2018, 7, 7, 17, 0),
    price: 15,
    category: "street"
  },
  ,
  {
    name: "The concert!!",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcae",
    location: { type: "Point", coordinates: [40.423687, -3.672756] },
    rating: 7,
    description:
      "He creado una partitura sin notas y nos deleitaremos en el palacio de los deportes escuchando nada",
    capacity: 120,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcad", hasCome: true }],
    date: new Date(2018, 7, 7, 18, 0),
    price: 150,
    category: "street"
  },
  {
    name: "Mimo!!",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcae",
    location: { type: "Point", coordinates: [40.413387, -3.672356] },
    rating: 7,
    description: "Mamemimomu mimemo momimame",
    capacity: 120,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcad", hasCome: true }],
    date: new Date(2018, 7, 7, 18, 0),
    price: 150,
    category: "street"
  },
  {
    name: "Rock and roll!!",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcae",
    location: { type: "Point", coordinates: [40.409787, -3.672956] },
    rating: 7,
    description: "Museo de piedras preciosas y desodorantes",
    capacity: 120,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcad", hasCome: true }],
    date: new Date(2018, 7, 7, 18, 0),
    price: 150,
    category: "street"
  },
  {
    name: "Campeonato del barrio parque!!",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcae",
    location: { type: "Point", coordinates: [40.385562, -3.673693] },
    rating: 7,
    description: "Futbol",
    capacity: 120,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcad", hasCome: true }],
    date: new Date(2018, 7, 7, 18, 0),
    price: 150,
    category: "street"
  },
  {
    name: "Parroquia san juan",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcae",
    location: { type: "Point", coordinates: [40.380993, -3.674144] },
    rating: 7,
    description: "A misa chavales!",
    capacity: 120,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcad", hasCome: true }],
    date: new Date(2018, 7, 7, 18, 0),
    price: 150,
    category: "street"
  },
  {
    name: "Enchufla A bailar!!",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcae",
    location: { type: "Point", coordinates: [40.383284, -3.672623] },
    rating: 7,
    description: "Museo de piedras preciosas y desodorantes",
    capacity: 120,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcad", hasCome: true }],
    date: new Date(2018, 7, 7, 18, 0),
    price: 150,
    category: "street"
  },
  {
    name: "Ven al medico!!",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcae",
    location: { type: "Point", coordinates: [40.379238, -3.669664] },
    rating: 7,
    description: "Ponte malo y te damos drogas gra-tis",
    capacity: 120,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcad", hasCome: true }],
    date: new Date(2018, 7, 7, 18, 0),
    price: 150,
    category: "street"
  },
  {
    name: "Clases de piano con la mirada!!",
    id_user_anunciante: "5c06d6125ef77c07aa3ddcae",
    location: { type: "Point", coordinates: [40.379295, -3.672668] },
    rating: 7,
    description: "Musica clasica sensual",
    capacity: 120,
    reserved: [{ id_cliente: "5c06d6125ef77c07aa3ddcad", hasCome: true }],
    date: new Date(2018, 7, 7, 18, 0),
    price: 150,
    category: "street"
  }
];

Event.deleteMany()
  .then(() => {
    return Event.create(events);
  })
  .then(eventsCreated => {
    console.log(
      `${eventsCreated.length} events created with the following id:`
    );
    console.log(eventsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
