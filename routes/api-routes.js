// Dependencies
// =============================================================
// Requiring our Todo model
var db = require("../models");
var passport = require("../config/passport");
// Routes
// =============================================================
module.exports = (app) => {
    /*=============================================
    =            Login Routes          =
    =============================================*/
    // POST route for user login 
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        res.json(req.user);
    });

    // POST route for user signup
    app.post('/api/signup', (req, res) => {
        // let user = {
        //     email: req.body.email,
        //     password: req.body.password
        // }
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            // .then((result) => {
            //     // console.log('Entry created!')

            // })
            .then((result) => {
                // req.login(user)
                // res.json(result);
                res.redirect(307, '/api/login');

            })
            .catch((err) => {
                res.status(401).json(err);
            });
    });



    // Route for logging user out 
    app.get('/logout', (req, res) => {
        console.log('logout');
        req.logout();
        res.redirect('/');
    });

    // // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    // POST route after user makes course selections
    // This should recieve the desired genre and areas of focus
    //This route should use posted information to create a course for the user
    app.post('/api/course', (req, res) => {
        // console.log(req.body);
        db.Course.create({
            course_name: req.body.course_name,
            resources: req.body.resources,
            genre: req.body.genre,
            UserId: req.body.UserId
        })
            .then((result) => {
                res.json(result);
                // then create course_content?
                // dbCourse.id 
            });

    });

    //Ok so a course has been made, now the profile page will need the information to display basic contents of the courses that a user has into the profile view
    //so this will be a GET all route to get all courses associated with a user 
    app.get('/api/course/user/:UserId', (req, res) => {
        db.Course.findAll({
            where: {
                UserId: req.params.UserId
            }
        }).then((results) => {
            res.json(results)
        })
    });

    //this route will get info on one course
    app.get('/api/course/:CourseId', (req, res) => {
        db.Course.findOne({
            where: {
                CourseId: req.params.CourseId
            }
        }).then((results) => {
            res.json(results)
            // console.table(results)
        })
    });


    // This route will be a single course GET route when loading information into the course_view.html
    // will need course id cause you will get every conent associated with the course 
    //this route will be used to get the contents of the course to diplay on the course_view page
    app.get('/api/course_content/:CourseId', (req, res) => {
        db.Content.findAll({
            where: {
                CourseId: req.params.CourseId,
            }
        }).then((results) => {
            res.json(results);
        })
    });

    //Thus route will POST content to the contents table
    app.post('/api/course_content/', (req, res) => {
        // console.log(req.body.courses[0].CourseId);
        db.Content.create({
            type: req.body.type,
            image: req.body.image,
            content_code: req.body.code,
            focus: req.body.focus,
            title: req.body.title,
            link: req.body.link,
            CourseId: req.body.course_id,
            UserId: req.body.UserId
        })
            .then((result) => { res.json(result) })
            .catch((err) => { console.error(err) })
    })

    // This route will UPDATE the read/time_completed status of the course
    app.put('/api/course', (req, res) => {
        db.Course.update({ completed: req.body.completed }, {
            where: {
                id: req.body.id
            }
        }).then((dbCourse) => {
            res.json(dbCourse);
        });
    });
    // This route will UPDATE the read/time_completed status of the course_content_item
    app.put('/api/course_content', (req, res) => {
        db.Content.update({ watched_read: req.body.watched_read }, {
            where: {
                id: req.body.id
            }
        }).then((dbContent) => {
            res.json(dbContent);
        });
    });

    // This route will DELETE a course 
    app.delete('api/course/"id', (req, res) => {
        db.Course.destroy({
            where: {
                id: req.parms.id
            }
        }).then((dbCourse) => {
            res.json(dbCourse);
        })
    });

    // This route will DELETE a course_content
    app.delete('api/course_content/:id', (req, res) => {
        db.Content.destroy({
            where: {
                id: req.params.id
            }
        }).then((dbContent) => {
            res.json(dbContent);
        })
    });














};