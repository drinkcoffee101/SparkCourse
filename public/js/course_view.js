$(document).ready(function () {

  /*----------  Modal Init  ----------*/
  // $(".modais").iziModal({
  //     history: false,
  //     iframe : true,
  //     fullscreen: true,
  //     headerColor: '#000000',
  //     group: 'group1',
  //     loop: true
  //   });


  /*----------  Load course content info  ----------*/
  let course = document.cookie
  $.ajax({
    type: "GET",
    url: "/api/course_content/" + course
  }).then((result) => {
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
              <a href="${e.link}" tagret="_blank" class="btn btn-primary">Go somewhere</a>
              <hr>
            </div>
          </div>
            `
    })
    output += '</div>';
    document.getElementById('courses-container').innerHTML = output;
  }

});



//embed?url=