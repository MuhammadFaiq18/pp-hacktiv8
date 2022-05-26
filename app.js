const express = require("express");
const Controller = require("./controllers");
const app = express();
const port = 3000;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session_name",
    secret: "secreet pass",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      secure: false,
    },
  })
);

const redirectLogin = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect("/login")
  } else {
    next()
  }
}

const redirectHome = (req, res, next) => {
  if(req.session.userId) {
    res.redirect("/")
  } else {
    next()
  }
}

app.get("/", (req, res) => res.render("home"));
app.get("/register", Controller.register);
app.post("/register", Controller.postRegister);
app.get("/login", redirectHome, Controller.login);
app.post("/login", redirectHome, Controller.postLogin);
app.get("/logout", Controller.logout);
app.get("/clubs", redirectLogin, Controller.club);
app.get("/clubs/:clubId", redirectLogin, Controller.showPlayer);
app.get("/clubs/:clubId/delete/:playerId", redirectLogin, Controller.deletePlayer);
app.get("/clubs/:clubId/update/:playerId", redirectLogin, Controller.updatePlayer);
app.post("/clubs/:clubId/update/:playerId", redirectLogin, Controller.postUpdatePlayer);
app.get("/players", redirectLogin, Controller.allPlayer);
app.get("/players/add", redirectLogin, Controller.addPlayer);
app.post("/players/add", redirectLogin, Controller.storePlayer);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
