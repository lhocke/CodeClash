module.exports = function(sequelize, DataTypes) {
  var strValidation = {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 140]
    }
  };
  var intValidation = {
    type: DataTypes.INTEGER,
    defaultValue: 0
  };
  var booleanValidation = {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

  var User = sequelize.define("User", {
    first_name: strValidation,
    last_name: strValidation,
    username: strValidation,
    solo_wins: intValidation,
    solo_losses: intValidation,
    duel_wins: intValidation,
    duel_losses: intValidation,
    score: intValidation,
    first_time: booleanValidation
  });

  return User;
};