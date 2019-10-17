



$(document).ready(() => {
    //had issues with .tab-pane so hiding instead

    $('#sectionB').hide();


    $('#submit').click(function (e) {
        e.preventDefault();


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





