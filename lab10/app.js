const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const uuidv4 = require("uuid/v4");
const auth = require("./auth");
const app = express();

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const expireCookie = res => {
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  res.cookie("authCookie", "Expired", { expires: oneHourAgo });
  res.clearCookie("authCookie");
};

const pushThroughCookie = (req, res, next) => {
  const cookie = req.cookies["authCookie"];
  if (cookie && auth.checkSession(cookie)) res.redirect("/private");
  else next();
};

const pullBackCookie = (req, res, next) => {
  const cookie = req.cookies["authCookie"];
  if (cookie) {
    const sessionValid = auth.checkSession(cookie);
    if (sessionValid) next();
    else {
      //expire the cookie
      expireCookie(res);
      res.status(403).sendFile(path.join(__dirname, "forbidden.html"));
    }
  } else res.status(403).sendFile(path.join(__dirname, "forbidden.html"));
};

//we make a middleware for checking auth
app.get("/", pushThroughCookie, (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", pushThroughCookie, (req, res) => {
  //hash and auth user
  const user = auth.getUserIndex(req.body.username);
  //bcrypt isn't working for some reason...
  // if(user && auth.passwordsMatch(req.body.password, auth.getUserAtIndex(user).hashedPassword)) {
  if (user && req.body.password === auth.getUserAtIndex(user).hashedPassword) {
    //authed, generate a session
    const sessionId = uuidv4();
    //store session on user and cookie
    auth.setSession(user, sessionId);
    res.cookie("authCookie", sessionId);
    res.redirect("/private");
  } else {
    res.redirect("/?failure=true");
  }
});

app.get("/private", pullBackCookie, (req, res) => {
  const cookie = req.cookies["authCookie"];
  user = auth.getUserFromSession(cookie);
  delete user.hashedPassword;
  res.send(user);
});

app.get("/logout", pullBackCookie, (req, res) => {
  expireCookie(res);
  res.sendFile(path.join(__dirname, "logout.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
  if (process && process.send) process.send({ done: true });
});
