var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 140]
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 140]
      }
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // about: {
    //     type: DataTypes.TEXT
    // },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
            len: [1]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 140]
        }
    },
    last_login: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    // Game Stats -------------------------------
    solo_wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    solo_losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
    // solved: {

    // }
  });

  User.prototype.validPassword = function (password) {
      return bcrypt.compareSync(password, this.password)
  }

  return User;
};