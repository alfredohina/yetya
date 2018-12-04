// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require("dotenv").config();
const mongoose = require("mongoose");
const Review = require("../models/Review");

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

let reviews = [
  {
    username: "patricia",
    id_user_cliente: "5c06d6125ef77c07aa3ddcad",
    id_event: "5c06daf8f49f1a07e8deab6c",
    rating: 6,
    description: "Es un virtuoso!!",
  },
  {
    username: "alice",
    id_user_cliente: "5c06d6125ef77c07aa3ddcab",
    id_event: "5c06daf8f49f1a07e8deab6a",
    rating: 9,
    description: "Vaya Crack, nunca mejor dicho!!",
  }
];

Review.deleteMany()
  .then(() => {
    return Review.create(reviews);
  })
  .then(reviewsCreated => {
    console.log(`${reviewsCreated.length} reviews created with the following id:`);
    console.log(reviewsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
