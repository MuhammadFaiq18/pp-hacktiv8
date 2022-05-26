const { Club, Player, User, Profile } = require("../models");
const ratingConverter = require("../helpers/ratingConverter");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

class Controller {
  static register(req, res) {
    res.render("register");
  }

  static postRegister(req, res) {
    const { userName, password } = req.body;

    User.create({ userName: userName, password: password }).then(
      (dataProfile) => {
        const { name, email } = req.body;
        return Profile.create({
          name: name,
          email: email,
          UserId: dataProfile.id,
        });
      }
    );
    res.redirect("/login");
  }

  static login(req, res) {
    const { error } = req.query;

    res.render("login", { error });
  }

  static postLogin(req, res) {
    const { userName, password } = req.body;

    User.findOne({
      where: { userName },
      include: Profile,
    }).then((dataUser) => {
      if (dataUser) {
        let salt = bcryptjs.genSaltSync(10);
        let hash = bcryptjs.hashSync(password, salt);
        const checkPassword = bcryptjs.compareSync(dataUser.password, hash);

        if (checkPassword) {
          req.session.userId = dataUser.id;
          return res.redirect("/");
        } else {
          const error = "Invalid username or password";
          return res.redirect(`/login?error=${error}`);
        }
      }
    });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/");
      } else {
        res.redirect("/login");
      }
    });
  }

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
    const { position } = req.query;
    let option = { include: Club };

    if (position) {
      option.where = {
        position: {
          [Op.like]: `%${position}%`,
        },
      };
    }

    Player.findAll(option)
      .then((data) => {
        res.render("allPlayer", { data, ratingConverter });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static showPlayer(req, res) {
    const { clubId } = req.params;

    Club.findByPk(clubId, { include: Player })
      .then((data) => {
        res.render("playerList", { data, ratingConverter });
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
    let dataPlayer = { name, age, position, nationality, rating, ClubId };

    Player.create(dataPlayer)
      .then(() => {
        res.redirect("/players");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          err = err.errors.map((el) => el.message);
        }
        res.send(err);
      });
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
        if (err.name == "SequelizeValidationError") {
          err = err.errors.map((el) => el.message);
        }
        res.send(err);
      });
  }
}

module.exports = Controller;
