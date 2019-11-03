// import Shepherd from 'shepherd.js';

$(document).ready(function () {

    //create a new Tour instance for your tour
    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            classes: 'shadow-md bg-purple-dark',
            scrollTo: true
        }
    });

    //Next, add your steps
    tour.addStep({
        id: 'step-1',
        text: 'Click this icon to begin making a new course!',
        attachTo: {
            element: '#step-one',
            on: 'bottom'
        },
        classes: 'example-step-extra-class'
    });

    tour.addStep({
        id: 'step-2',
        text: 'Using the drop down menu, select a genre, area of focus, and how many resoucres you would like to add.',
        attachTo: {
            element: '.brand-logo',
            on: 'bottom'
        },
        classes: 'example-step-extra-class'
    });

    //to start the tour, just call start on your Tour instance
    // tour.start();


    $("#modal").iziModal({
        width: 1000
    });
    $("#modal2").iziModal({
        width: 1000
    });
    $('.trigger').on('click', function (event) {
        event.preventDefault();
        tour.next()
        // $('#modal').iziModal('setZindex', 99999);
        // $('#modal').iziModal('open', { zindex: 99999 });
        $('#modal').iziModal('open');
    });


    //hide the current tour step
    // $('#create-course').click(function (e) {
    //     e.preventDefault();
    //     tour.hide()
    // }


    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    //declared here so course_create api has access to this variable
    let userId = 0;
    $.get("/api/user_data").then(function (data) {
        userId = data.id;
        /*----------  Get each course a user has made  ----------*/
        $.ajax({
            method: 'GET',
            url: '/api/course/user/' + userId,
        }).then((result) => {
            result.forEach(course => {
                createCourseCard(course)
            })
            //skip to the 3rd tour option after user has made a course 
            if (result.length === 1) {
                tour.addStep({
                    id: 'step-3',
                    text: 'Click this button to view the contents of your newly created course!',
                    attachTo: {
                        element: '.red',
                        on: 'bottom'
                    },
                    classes: 'example-step-extra-class'
                });
                tour.next()
                tour.next()
                tour.next()
            }
            //if no courses have been made, start the tour
            else if (result.length === 0) {
                tour.start()
            }
        }).catch((err) => {
            console.log(err)
        })
    }).catch((error) => {
        console.log(error)
    })
    /*----------  view course  ----------*/
    $(document).on('click', 'a.red', function () {
        courseID = $(this).data('id')
        //Storing courseID as cookie so I can load the "course_view" page with contents with the specific courseID 
        document.cookie = courseID;
        /*----------  this route will be used to get the contents of the course to diplay on the course_view page  ----------*/
        $.ajax({
            type: "GET",
            url: "/api/course_content/" + courseID,
        }).then((result) => {

            window.location.replace('/course_view')
        }).catch((err) => { console.error(err) })
    });

    /*----------  delete course  ----------*/
    $(document).on('click', 'a.blue', function () {
        let id = $(this).data('id')
        $(`#${id}`).fadeOut(750, function () { $(`#${id}`).remove(); })
        console.log(id)
        /*----------  this route will be used to delete the contents of the course   ----------*/
        $.ajax({
            type: "DELETE",
            url: "/api/course/" + id
        }).then((result) => {
            // window.location.replace('/course_view
        }).catch((err) => { console.error(err) })
    });


    //Function to create a card for a course 
    let createCourseCard = (course) => {
        let column = $(`<div class="col-md-4 mt-5" id="${course.id}">`)
        let card = $(`<div class="card text-center blue-grey darken-1">`)
        let image = $(`<img class="card-img-top" src="https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap">`)
        let body = $(`<div class="card-body white-text">`)
        let title = $(`<h5 class="card-title">`)
        title.text(course.course_name)
        let footer = $(`<div class="card-footer text-muted">`)
        let iconRow = $(`<div class="row">`)
        let icon1Col = $(`<div class="col">`)
        let icon1Link = $(`<a class='btn red' data-id='${course.id}'>`)
        let icon1 = $(`<i class="fas fa-music">`)
        let icon2Col = $(`<div class="col">`)
        //link to delete route 
        let icon2Link = $(`<a class='btn blue' data-id='${course.id}'><i class="material-icons">close</i></a>`)

        //prepend?
        $('#courses').prepend(column)
        column.append(card)
        card.append(image)
        card.append(body)
        body.append(title)
        card.append(footer)
        footer.append(iconRow)
        iconRow.append(icon1Col)
        icon1Col.append(icon1Link)
        icon1Link.append(icon1)
        iconRow.append(icon2Col)
        icon2Col.append(icon2Link)

        //check if the total has reached 100%, if so, fade the card
        if (course.percentComplete == 100) {
            $(`#${course.id}`).fadeTo("slow", 0.5, function () {
            });
        }
    }



});