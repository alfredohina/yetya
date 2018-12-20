require('dotenv').config();

const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const { isLoggedOut } = require('../middlewares/isLogged')
const { isLoggedIn } = require('../middlewares/isLogged')
const uploadCloud = require('../config/cloudinary');
const sendMail = require("../email/sendmail");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", isLoggedOut('/'), passport.authenticate("local", {
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
  if (username === "" || password === "" || email === "") {
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


    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }

    const newUser = new User({
      username,
      password: hashPass,
      mail,
      role,
      confirmationCode: token
    });

    newUser.save()
      .then(() => {
        sendMail(mail, "Welcome to Yetya", newUser.confirmationCode);
        res.redirect("/auth/login");
      })
      .catch(err => {
        console.log(err);
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});

router.get("/confirm/:code", (req, res, next) => {
  const code = req.params.code;
  User.findOneAndUpdate({ confirmationCode: code }, { status: "Active" }).then(
    () => res.redirect("/")
  ).catch(()=>res.render("/auth/signup",{message:"Error"}));
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


router.post("/profile/:id", uploadCloud.single('photo'), (req, res, next) => {
  const us = {}
  if (req.file) {
      us.imgPath = req.file.url
  }
  if (req.body.mail) {
    us.mail = req.body.mail
  }
  if (req.body.role) {
    us.role = req.body.role
  }
  if (req.body.description) {
    us.description = req.body.description
  }
  User.findByIdAndUpdate(req.params.id, us)
    .then(() => res.redirect("/"))
    .catch(e => console.log("Error updating profile", e));
});


module.exports = router;
