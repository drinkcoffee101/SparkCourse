module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = (models) => {
        User.hasMany(models.Course);
    };

    return User;
}