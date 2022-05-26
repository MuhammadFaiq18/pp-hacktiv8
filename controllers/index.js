const { Club, Player, User, Profile } = require("../models");

class Controller {
  static club(req, res) {
    Club.findAll()
      .then((data) => {
        res.render("clubList", { data });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static allPlayer(req, res) {
    Player.findAll({ include: Club })
      .then((data) => {
        res.render("allPlayer", { data });
        res.send(data)
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static showPlayer(req, res) {
    const { clubId } = req.params;

    Club.findByPk(clubId, { include: Player })
      .then((data) => {
        res.render("playerList", { data });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addPlayer(req, res) {
    Club.findAll()
      .then((data) => {
        res.render("addPlayer", { data });
      })
      .catch((err) => res.send(err));
  }

  static storePlayer(req, res) {
    const { name, age, position, nationality, rating, ClubId } = req.body;
    let data = { name, age, position, nationality, rating, ClubId };

    Player.create(data)
      .then(res.redirect("/players"))
      .catch((err) => res.send(err));
  }

  static deletePlayer(req, res) {
    const { clubId, playerId } = req.params;

    Player.destroy({
      where: { id: playerId },
    })
      .then(() => {
        res.redirect(`/clubs/${clubId}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static updatePlayer(req, res) {
    const { clubId, playerId } = req.params;
    
    Player.findAll()
      .then((data) => {
        let editedData = data.find((el) => el.id == playerId);
        res.render("editPlayer", { editedData });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postUpdatePlayer(req, res) {
    const { clubId, playerId } = req.params;
    const { name, age, position, nationality, rating, ClubId } = req.body;

    Player.update(
      {
        name,
        age,
        position,
        nationality,
        rating,
        ClubId,
      },
      {
        where: {
          id: playerId,
        },
      }
    )
      .then(() => {
        res.redirect(`/clubs/${clubId}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
