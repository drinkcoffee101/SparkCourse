$(document).ready(function () {

    $("#modal").iziModal({
        width: 1000
      });
    $('.trigger').on('click', function (event) {
        event.preventDefault();
        // $('#modal').iziModal('setZindex', 99999);
        // $('#modal').iziModal('open', { zindex: 99999 });
        $('#modal').iziModal('open');
    });
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    //declared here so course_create api has access to this variable
    let userId = 0;
    $.get("/api/user_data").then(function (data) {
        userId = data.id;
    }).then(() => {
        /*----------  Get each course a user has made  ----------*/
        $.ajax({
            method: 'GET',
            url: '/api/course/user/' + userId,
        }).then((result) => {


            result.forEach(course => {
                createCourseCard(course)
            })
        }).catch((err) => {
            console.error(err)
        })
    })

    $(document).on('click', 'a.red', function () {
        courseID = $(this).data('id')
        document.cookie = courseID;
        // console.log(courseID)
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
        $('#courses').append(column)
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