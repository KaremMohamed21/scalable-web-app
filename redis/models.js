const User = (id, name, type) => {
  if (arguments.length < 3) return new Error("Not enough args!");
  return { id, user: name, type };
};

const Chat = (message, room, user) => {
  if (arguments.length < 3) return new Error("Not enough args!");
  if (typeof user !== "object") return new Error("User must be an ob ject!");
  return {
    id: user.id + new Date().getTime().toString(),
    message,
    room,
    createdAt: new Date().getTime(),
    user,
  };
};

const Room = (name) => {
  if (arguments.length < 1) return new Error("Room needs a name!");
  return { id: name, name };
};

exports.User = User;
exports.Chat = Chat;
exports.Room = Room;
