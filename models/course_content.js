module.exports = (sequelize, DataTypes) => {
    var Content = sequelize.define('Content', {
        //video or article
        type: DataTypes.STRING,
        //characters or min 
        length: DataTypes.INTEGER,
        //mixing, sound design, etc.
        focus: DataTypes.STRING,
        watched_read: { type: DataTypes.BOOLEAN, defaultValue: false },
        title: DataTypes.STRING,
        link: DataTypes.STRING,
        image: DataTypes.STRING,
        content_code: DataTypes.STRING
    });

    Content.associate = (models) => {
        Content.belongsTo(models.Course, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Content;
};