let io = require("socket.io");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const config = require("../config");
const redisClient = require("../utils/redisClient");
const expressSession = require("express-session");
const ConnectRedis = require("connect-redis")(expressSession);
const redisSession = new ConnectRedis({ client: redisClient });
const redisAdapter = require("@socket.io/redis-adapter");

const socketAuth = (socket, next) => {
  const parsedCookie = cookie.parse(socket.request.headers.cookie);
  const sid = cookieParser.signedCookie(
    parsedCookie["connect.sid"],
    config.secret
  );

  if (parsedCookie["connect.sid"] === sid)
    return next(new Error("Not Authenticated"));

  redisSession.get(sid, (err, session) => {
    if (!session.isAuthenticated) {
      socket.user = session.user;
      socket.sid = sid;
      return next();
    } else {
      return next(new Error("Not Authenticated"));
    }
  });
};

const socketConnection = (socket) => {
  socket.emit("message", { message: "Hey" });
  socket.emit("message", socket.user);
  socket.on("GetMe", () => {});
  socket.on("GetUser", (room) => {});
  socket.on("GetChat", (data) => {});
  socket.on("AddChat", (chat) => {});
  socket.on("GetRoom", () => {});
  socket.on("AddRoom", (r) => {});
  socket.on("disconnect", () => {});
};

exports.startIO = (server) => {
  io = io(server);
  console.log("WebSockets running");

  // io.adapter(redisAdapter(redisClient));

  const packtChat = io.of("packtchat");
  packtChat.use(socketAuth);
  packtChat.on("connection", socketConnection);

  return io;
};
