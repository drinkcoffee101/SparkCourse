



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


    /*----------  Video Background  ----------*/
    // var video = document.querySelector('video')
    //     , container = document.querySelector('#container');

    // var setVideoDimensions = function () {
    //     // Video's intrinsic dimensions
    //     var w = video.videoWidth
    //         , h = video.videoHeight;

    //     // Intrinsic Ratio
    //     // Will be more than 1 if W > H and less if W < H
    //     var videoRatio = (w / h).toFixed(2);

    //     // Get the container's computed styles
    //     //
    //     // Also calculate the min dimensions required (this will be
    //     // the container dimentions)
    //     var containerStyles = window.getComputedStyle(container)
    //         , minW = parseInt(containerStyles.getPropertyValue('width'))
    //         , minH = parseInt(containerStyles.getPropertyValue('height'));

    //     // What's the min:intrinsic dimensions
    //     //
    //     // The idea is to get which of the container dimension
    //     // has a higher value when compared with the equivalents
    //     // of the video. Imagine a 1200x700 container and
    //     // 1000x500 video. Then in order to find the right balance
    //     // and do minimum scaling, we have to find the dimension
    //     // with higher ratio.
    //     //
    //     // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
    //     // scale 500 to 700 and then calculate what should be the
    //     // right width. If we scale 1000 to 1200 then the height
    //     // will become 600 proportionately.
    //     var widthRatio = minW / w
    //         , heightRatio = minH / h;

    //     // Whichever ratio is more, the scaling
    //     // has to be done over that dimension
    //     if (widthRatio > heightRatio) {
    //         var newWidth = minW;
    //         var newHeight = Math.ceil(newWidth / videoRatio);
    //     }
    //     else {
    //         var newHeight = minH;
    //         var newWidth = Math.ceil(newHeight * videoRatio);
    //     }

    //     video.style.width = newWidth + 'px';
    //     video.style.height = newHeight + 'px';
    // };

    // video.addEventListener('loadedmetadata', setVideoDimensions, false);
    // window.addEventListener('resize', setVideoDimensions, false);



});





