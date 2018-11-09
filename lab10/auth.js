const bcrypt = require("bcrypt");
const users = require("./users");
const saltRounds = 16;

const checkSession = sessionId => {
  for (let i in users) {
    if (users[i]._id === sessionId) return true;
  }
  return false;
};

const getUserAtIndex = index => {
  return users[index];
};

const getUserIndex = username => {
  for (let i in users) {
    if (users[i].username === username) return i;
  }
  return null;
};

const setSession = (index, sessionId) => {
  users[index]._id = sessionId;
};

const getUserFromSession = sessionId => {
  for (let i in users) {
    if (users[i]._id === sessionId) return users[i];
  }
};

//for some reason this doesn't work, and I can't seem to figure out why...
const passwordsMatch = (requestPassword, userPassword) => {
  console.log(requestPassword);
  const hash = bcrypt.hashSync(requestPassword, saltRounds);

  console.log("Hash: " + hash);
  console.log("User: " + userPassword);
  return bcrypt.compareSync(userPassword, hash);
};

module.exports = {
  checkSession: checkSession,
  getUserIndex: getUserIndex,
  getUserAtIndex: getUserAtIndex,
  getUserFromSession: getUserFromSession,
  passwordsMatch: passwordsMatch,
  setSession: setSession
};
