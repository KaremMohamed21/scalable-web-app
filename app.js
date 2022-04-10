const express = require("express");
const partials = require("express-partials");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./utils/redisClient");
const csrf = require("csurf");
const flash = require("connect-flash");
const io = require("./sockets");

const router = require("./routes");
const config = require("./config");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const { logger } = require("./middlewares/logger");
const { csrfTokenizer } = require("./middlewares/csrf");

const app = express();

app.set("view engine", "ejs");
app.set("view options", { defaultLayout: "layout" });
app.use(partials());
app.use(logger);
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(config.secret));
app.use(
  session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({ client: redisClient }),
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(csrf({}));
app.use(csrfTokenizer);
app.use(flash());

app.use((req, res, next) => {
  req.session.user = "Kareem";
  next();
});

app.use(router);

app.use(errorHandler);
app.use("*", notFound);

const server = app.listen(config.port, () => {
  console.log("App server running on port 3000");
});

io.startIO(server);
