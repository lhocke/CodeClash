module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    solo_wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    solo_losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // // below code adds columns for the duels if we have time
    // duel_wins: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0
    // },
    // duel_losses: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0
    // },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    first_time: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return User;
};