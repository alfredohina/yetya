const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const {isLoggedOut} = require('../middlewares/isLogged')
const {isLoggedIn} = require('../middlewares/isLogged')


// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login",isLoggedOut('/'), passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const mail = req.body.mail;
  const role = "cliente";
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      mail,
      role
    });

    newUser.save()
    .then(() => {
      res.redirect("/auth/login");
    })
    .catch(err => {
      console.log(err);
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});




router.get("/signup2", (req, res, next) => {
  res.render("auth/signup2");
});

router.post("/signup2", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const mail = req.body.mail;
  const role = "anunciante";
  if (username === "" || password === "") {
    res.render("auth/signup2", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup2", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      mail,
      role
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup2", { message: "Something went wrong" });
    })
  });
});





router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/:id/profile", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.render("auth/profile", { user });
    })
    .catch(err => {
      console.log("Error editing profile", err);
      next();
    });
});

router.post("/profile/:id", (req, res, next) => {
  const us = {
    puntuacion: req.body.puntuacion,
    mail: req.body.mail,
    role: req.body.role,
    description: req.body.description
  };
  User.findByIdAndUpdate(req.params.id, us)
    .then(() => res.redirect("/"))
    .catch(e => console.log("Error updating profile", e));
});


module.exports = router;
