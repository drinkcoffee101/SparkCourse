module.exports = (sequelize, DataTypes) => {
    var Course = sequelize.define('Course', {
        course_name: DataTypes.STRING,
        resources: DataTypes.INTEGER,
        completed: { type: DataTypes.BOOLEAN, defaultValue: false },
        // date_completed: { type: DataTypes.DATE, defaultValue: '' },
        genre: DataTypes.STRING
    });

    //a course should belong to a user
    //a course can't be created without a User due to the foreign key constraint 
    //will add a userId attr to the Course
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        
        });
    };

    Course.associate = (models) => {
        Course.hasMany(models.Content, {
            onDelete: 'cascade'
        });
    };

    return Course;
};



// course_name: 
// resources: 
// genre: 
// userid: 

//User hasMany Courses ?