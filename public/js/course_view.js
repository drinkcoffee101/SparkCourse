$(document).ready(function () {
    // console.log(document.cookie)
    let course = document.cookie
    // $.get("/api/user_data").then(function (data) {
    //     userId = data.id;
    //     $.ajax({
    //         type: "GET",
    //         url: "/api/course_content/" + userId
    //     }).then((result) => {
    //         // console.table(result)
    //             createCourseContent(result);
    //     }).catch((err) => { console.error(err) })
    // })
    $.ajax({
        type: "GET",
        url: "/api/course_content/" + course
    }).then((result) => {
        // console.table(result)
            createCourseContent(result);
    }).catch((err) => { console.error(err) })


    let createCourseContent = (data) => {
        let output = '<div class="card-columns">';
        data.forEach(e => {
            output += `
            <div class="card">
            <img src="${e.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${e.title}</h5>
              <a href="${e.link}" target="_blank" class="btn btn-primary">Go somewhere</a>
              <hr>
            </div>
          </div>
            `
        })


        output += '</div>';
        document.getElementById('courses-container').innerHTML = output;
    }
});
