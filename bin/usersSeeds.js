// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const bcryptSalt = 10;

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

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    mail: "alice@gmail.com",
    puntuacion: 7,
    role: "cliente"
  },
  ,
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    mail: "bob@gmail.com",
    puntuacion: 8,
    role: "anunciante",
    description: "Soy un niño graciosillo estrovertido tutututut y todos saben que soooyyy shinchaaaaan!"
  },
  {
    username: "patricia",
    password: bcrypt.hashSync("patricia", bcrypt.genSaltSync(bcryptSalt)),
    mail: "patricia@gmail.com",
    puntuacion: 6,
    role: "cliente"
  },
  ,
  {
    username: "sandra",
    password: bcrypt.hashSync("sandra", bcrypt.genSaltSync(bcryptSalt)),
    mail: "sandra@gmail.com",
    puntuacion: 10,
    role: "anunciante",
    description: "Soy una niña graciosilla estrovertida tutututut y todos saben que soooyyy shinchaaaaana!"
  }
];


User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
