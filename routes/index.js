const { Router } = require("express");
const { passport } = require("../passport");
const User = require("./../passport/users");

const router = Router();

router.get("/", (req, res) => {
  res.cookie("indexCookie", "cookie");
  res.render("index", { title: "Index" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register", message: req.flash("error") });
});

router.post("/register", (req, res) => {
  if (req.body.username && req.body.password) {
    User.addUser(req.body.username, req.body.password, (err, profile) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/register");
      } else {
        req.login(profile, (err) => {
          res.redirect("/chat");
        });
      }
    });
  } else {
    req.flash("error", "Please fill out all the fields");
    res.redirect("/register");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/chat",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/chat", (req, res) => {
  res.render("chat", { title: "chat" });
});

router.get("/auth/facebook/login", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/chat",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get(
  "/auth/google/login",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/chat",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.session.isAuthenticated = false;
  req.logout();
  res.redirect("/");
});

module.exports = router;
