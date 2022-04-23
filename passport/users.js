const Users = {
  josh: {
    password: "test1234",
    displayName: "Josh",
    id: "josh",
    provider: "local",
    username: "josh",
  },
};

const findByUsername = (username, cb) => {
  cb(null, Users[username]);
};

const addUser = (username, password, cb) => {
  if (Users[username] === undefined) {
    Users[username] = {
      password: password,
      displayName: username,
      id: username,
      provider: "local",
      username: username,
    };
    return cb(null, Users[username]);
  } else {
    return cb({ errorCode: 1, message: "User exists!" }, null);
  }
};

const updatePassword = (username, password) => {
  Users[username].password = password;
};

exports.findByUsername = findByUsername;
exports.addUser = addUser;
exports.updatePassword = updatePassword;
