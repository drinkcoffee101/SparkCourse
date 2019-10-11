// Dependencies
// =============================================================
var path = require("path");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = (app) => {
    //index route to load the sign-up/sign-in view
    app.get('/', (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/profile");
        }
        res.sendFile(path.join(__dirname, '../public/login.html'));
    })
    // route to load the user profile view where they can view all of their courses 
    app.get('/profile', isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, '../public/profile.html'));
    })
    //route to load the course create page
    app.get('/course_create', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/create_course.html'));
    })
    //route to load a view for one course
    app.get('/course_view', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/course_view.html'));
    })
};