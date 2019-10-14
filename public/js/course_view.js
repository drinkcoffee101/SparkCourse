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


  $(document).on('click', 'a.blue', function () {
    contentID = $(this).data('id')

    $(`#${contentID}`).fadeOut(750, function () { $(`#${contentID}`).remove(); })

    $.ajax({
      type: 'DELETE',
      url: "/api/course_content/" + contentID
    }).then((result) => {

    }).catch((err) => {
      console.error(err)
    })
  });

  let createCourseContent = (data) => {
    let output = '<div class="card-columns">';
    data.forEach(e => {
      output += `
            <div class="card blue-grey darken-1" id="${e.id}">
            <img src="${e.image}" class="card-img-top" alt="...">
            <div class="card-body" style="padding-bottom:0px;text-align:center">
              <h5 class="card-title">${e.title}</h5>
              <a href="${e.link}" tagret="_blank" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">
              <div class="row">
                <div class="col text-center">
                    <a class="btn red" data-id='${e.id}'>
                      <i class="material-icons">check</i>
                    </a>
                  </div>
                <div class="col text-center">
                    <a class="btn blue" data-id='${e.id}'>
                      <i class="material-icons">close</i>
                    </a>
                  </div>
              </div>
            </div>
          </div>`
    })
    output += '</div>';
    document.getElementById('courses-container').innerHTML = output;
  }

});

