// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = (app) => {
    //index route to load the sign-up/sign-in view
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    });
    // route to load the user profile view where they can view all of their courses 
    app.get('/profile',(req, res) =>{
        res.sendFile(path.join(__dirname, '../public/profile.html'));
    })
    //route to load the course create page
    app.get('/course_create', (req, res) =>{
        res.sendFile(path.join(__dirname, '../public/create_course.html'));
    })
    //route to load a view for one course
    app.get('/course_view', (req, res) =>{
        res.sendFile(path.join(__dirname, '../public/create_view.html'));
    })
};