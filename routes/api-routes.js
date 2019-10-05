// Dependencies
// =============================================================
// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = (app) => {


    /*=============================================
    =            Login Routes          =
    =============================================*/
    // POST route for user login 
    app.post('/api/login', (req, res) => {
        // res.json(req.user);
    });

    // POST route for user signup
    app.post('/api/signup', (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(() =>{
            console.log('Entry created!')
        })
        // .then(() => {
        //     res.redirect(307, '/api/login');
        // })
        // .catch((err) => {
        //     res.status(401).json(err);
        // });
    });

    // Route for logging user out 
    app.get('/logout', (req, res) => {
        // req.logout();
        // res.redirect('/');
    });

    // // Route for getting some data about our user to be used client side
    // app.get("/api/user_data", function (req, res) {
    //     if (!req.user) {
    //         // The user is not logged in, send back an empty object
    //         res.json({});
    //     } else {
    //         // Otherwise send back the user's email and id
    //         // Sending back a password, even a hashed password, isn't a good idea
    //         res.json({
    //             email: req.user.email,
    //             id: req.user.id
    //         });
    //     }
    // });

    // POST route after user makes course selections
    // This should recieve the desired genre and areas of focus
    //This route should use posted information to create a course for the user
    app.post('/api/course', (req, res) => {
        // console.log(req.body);
        // db.Course.create({
        //     title: req.body.title,
        //     body: req.body.body,
        //     category: req.body.category
        // })
        //     .then((dbCourse) => {
        //         res.json(dbCourse);
        //     });
        //
    });

    //Ok so a course has been made, now the profile page will need the information to display basic contents of the courses that a user has into the profile view
    //so this will be a GET all route
    app.get('/api/course', (req, res) => {

    });


    // This route will be a single course GET route when loading information into the course_view.html
    // will need course id
    app.get('/api/course/:id', (req, res) => {

    });

    // This route will UPDATE the read/time_completed status of the course
    app.put('/api/course/:id', (req, res) => {

    });
    // This route will UPDATE the read/time_completed status of the course_content_item
    app.put('/api/course_content/:id', (req, res) => {

    });

    // This route will DELETE a course 
    app.delete('api/course/:id', (req, res) => {

    });

    // This route will DELETE a course_content
    app.delete('api/course_content/:id', (req, res) => {
        
    });














};