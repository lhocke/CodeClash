module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        question_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        question_func1: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        question_func2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
            defaultValue: '//Your Code Here\n'
        },
        question_func3: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
            defaultValue: '}'
        },
        valid_args: {
            type: DataTypes.STRING,
            get: function() {
                return this.getDataValue('valid_args').split(';')
            },
            set: function (val) {
                this.setDefaultValue('valid_args', val.join(';'));
            }
        },
        exp_val: {
            type: DataTypes.STRING,
            get: function() {
                return this.getDataValue('exp_val').split(';');
            },
            set: function() {
                this.setDefaultValue('exp_val',val.join(';'));
            },
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    
    return Question;
    Question.belongsToMany(User, {through: 'Arena'});
}
