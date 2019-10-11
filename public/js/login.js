



$(document).ready(() => {
    //had issues with .tab-pane so hiding instead

    $('#sectionB').hide();


    $('#submit').click(function (e) {
        e.preventDefault();


        /*----------  get info on one course  ----------*/
        // $.ajax({
        //     type: "GET",
        //     url: "/api/course/" + CourseId,
        // }).then((result) => { })
        /*----------    ----------*/



        /*----------  POST content to the contents table
         ----------*/
        //will be usful if a user want to replace certain content
        // $.ajax({
        //     type: "POST",
        //     url: "/api/course_content/",
        //     data: newContent
        // }).then((result) => { })
        /*----------    ----------*/

        /*----------  Course and content generation  ----------*/
        // $.ajax({
        //     method: 'POST',
        //     url: '/api/course',
        //     data: course,
        // }).then((res) => {
        //     // course_id = res.id
        //     // console.log(res.id);
        //     // searchCount = res.resources 
        //     // make a call to 1st API
        //     // $.ajax({}).then((res) => { })
        //     //"THEN" make a call to add the resources to the contents table//
        //     // for each object, insert the courseID
        //     test_courses.forEach(course => {
        //         course.CourseID = res.id;
        //     })
        //     //add each course_content to the table
        //     //put this probably within the future API call above
        //     $.ajax({
        //         method: 'POST',
        //         url: '/api/course_content',
        //         data: {courses: test_courses}
        //     })
        // })
        /*----------    ----------*/

        /*----------  Update the completion status of a course  ----------*/
        // $.ajax({
        //     method: "PUT",
        //     url: "/api/course",
        //     data: updateCourse
        // })
        /*----------    ----------*/

        /*----------  Update the completion status of a content item  ----------*/
        // $.ajax({
        //     method: "PUT",
        //     url: "/api/course_content",
        //     data: updateContent
        // })
        /*----------    ----------*/


        /*----------  This route will DELETE a course ----------*/
        // $.ajax({
        //     method: "DELETE",
        //     url: "/api/course" + courseId
        // })
        /*----------    ----------*/



        /*----------  This route will DELETE a course ----------*/
        // $.ajax({
        //     method: "DELETE",
        //     url: "/api/course_content" + contentId
        // })
        /*----------    ----------*/

    });


    /*=============================================
    =           Signup/Login Modal/Form            =
    =============================================*/



    $(document).on('click', '.trigger', function (event) {
        event.preventDefault();
        // $('#modal').iziModal('setZindex', 99999);
        // $('#modal').iziModal('open', { zindex: 99999 });
        $('#modal').iziModal('open');
    });


    $('.input').focus(function () {
        $(this).parent().find(".label-txt").addClass('label-active');
    });

    $(".input").focusout(function () {
        if ($(this).val() == '') {
            $(this).parent().find(".label-txt").removeClass('label-active');
        };
    });


    /*=============================================
    =     show and hide login vs sign-up          =
    =============================================*/

    $('#sign-in').click(function (e) {
        e.preventDefault();
        $('#sectionA').hide();
        $('#sectionB').show();

    });
    $('#sign-up').click(function (e) {
        e.preventDefault();
        $('#sectionA').show();
        $('#sectionB').hide();

    });



    /*=============================================
    =            Sign up            =
    =============================================*/
    var signUpEmail = $('#sign-up-email');
    var signUpPassword = $('#sign-up-password');
    var newUserId = {};

    $('#signup').click(function (e) {
        e.preventDefault();
        var newUser = {
            email: signUpEmail.val().trim(),
            password: signUpPassword.val().trim()
        };

        if (!newUser.email || !newUser.password) {
            return;
        }
        signUpUser(newUser.email, newUser.password);
        signUpEmail.val('');
        signUpPassword.val('');
    });

    let signUpUser = (email, password) => {
        $.post('/api/signup', {
            email: email,
            password: password
        }).then((data) => {
            newUserId = data.id
            window.location.replace('/profile');
        }).catch(handleLoginErr)
    }

    let handleLoginErr = (err) => {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

    /*=============================================
    =            Login            =
    =============================================*/
    var loginEmail = $('#login-email');
    var loginPassword = $('#login-password');
    $('#login').click(function (e) {
        e.preventDefault();

        var currentUser = {
            email: loginEmail.val().trim(),
            password: loginPassword.val().trim()
        }

        if (!currentUser.email || !currentUser.password) {
            return;
        }

        loginUser(currentUser.email, currentUser.password);
        loginEmail.val('');
        loginPassword.val('');
    });

    let loginUser = (email, password) => {
        $.post('/api/login', {
            email: email,
            password: password
        }).then((data) => {
            window.location.replace('/profile');
        }).catch((err) => {
            console.log(err);
        })
    }
});





