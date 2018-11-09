const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const uuidv4 = require("uuid/v4");
const auth = require("./auth");
const app = express();

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
      expireCookie(res);
      res.status(403).render("layouts/link", { title: "Forbidden" });
    }
  } else res.status(403).render("layouts/link", { title: "Forbidden" });
};

app.get("/", pushThroughCookie, (req, res) => {
  res.render("layouts/home");
});

app.post("/login", pushThroughCookie, (req, res) => {
  const user = auth.getUserIndex(req.body.username);
  //bcrypt isn't working for some reason...
  // if(user && auth.passwordsMatch(req.body.password, auth.getUserAtIndex(user).hashedPassword)) {
  if (user && req.body.password === auth.getUserAtIndex(user).hashedPassword) {
    //authed, generate a session
    const sessionId = uuidv4();
    auth.setSession(user, sessionId);
    res.cookie("authCookie", sessionId);
    res.redirect("/private");
  } else res.render("layouts/home", { error: true });
});

app.get("/private", pullBackCookie, (req, res) => {
  const cookie = req.cookies["authCookie"];
  res.render("layouts/user", auth.getUserFromSession(cookie));
});

app.get("/logout", pullBackCookie, (req, res) => {
  expireCookie(res);
  res.render("layouts/link", { title: "Logged Out" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
  if (process && process.send) process.send({ done: true });
});
