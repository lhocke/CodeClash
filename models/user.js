var bcrypt = require('bcrypt');
var mysql = require('mysql');


// var userSchema = mysql.Schema({
//   local: {
//     username: String,
//     password: String
//   },
  
//   google: {
//     id: String,
//     token: String,
//     email: String,
//     name: String
//   }
// });

// userSchema.methods.generateHash = function(password){
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
// }

// userSchema.methods.validPassword = function(password){
//   return bcrypt.compareSync(password, this.local.password);
// }

// module.exports = mysql.model('User', userSchema);


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
  User.belongsToMany(Question, {through: 'Arena'});
};