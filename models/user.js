module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    about: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
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

  return User;
};