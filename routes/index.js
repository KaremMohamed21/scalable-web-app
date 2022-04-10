const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.cookie("indexCookie", "cookie");
  res.render("index", { title: "Index" });
});
router.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});
router.post("/login", (req, res) => {
  console.log(req.body);
  res.send(req.body.username + " " + req.body.password);
});

router.get("/chat", (req, res) => {
  res.render("chat", { title: "chat" });
});

module.exports = router;
