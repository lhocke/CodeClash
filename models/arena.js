module.exports = function(sequelize, DataTypes) {
    var Arena = sequelize.define("Arena", {
        arena_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        }
    })

    return Arena;
}