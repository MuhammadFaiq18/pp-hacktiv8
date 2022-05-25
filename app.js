const express = require("express");
const Controller = require("./controllers");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("home"));
app.get("/clubs", Controller.club);
app.get("/clubs/:clubId", Controller.showPlayer)
app.get("/clubs/:clubId/delete/:playerId", Controller.deletePlayer)
app.get("/clubs/:clubId/update/:playerId", Controller.updatePlayer)
app.post("/clubs/:clubId/update/:playerId", Controller.postUpdatePlayer)
app.get("/players", Controller.allPlayer)
app.get("/players/add", Controller.addPlayer)
app.post("/players/add", Controller.storePlayer)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});