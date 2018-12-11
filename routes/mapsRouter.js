const express = require("express");
const router = express.Router();


router.get('/home', (req, res, next) => {
  console.log('Esta entrado aqui')
  res.render("./maps/home");
});


module.exports = router;