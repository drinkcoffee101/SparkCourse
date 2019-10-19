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
  //create a new progressBAr object so we can invoke the set() method to update the value 
  var bar1 = new ldBar("#bubble-bar");

  /*----------  Load course content info  ----------*/
  let course = document.cookie
  // console.log(course)
  let courseTotal;
  $.ajax({
    type: "GET",
    url: "/api/course_content/" + course
  }).then((result) => {
  
    createCourseContent(result);
  }).catch((err) => { console.error(err) })

  $.ajax({
    type: "GET",
    url: "/api/course/" + course
  }).then((data) => {
    courseTotal = data.percentComplete

    bar1.set(courseTotal)
  }).catch((err) => {
    console.error(err)
  })


  /*----------  Delete a course item  ----------*/
  $(document).on('click', 'a.blue', function () {
    let contentID = $(this).data('id')

    $(`#${contentID}`).fadeOut(750, function () { $(`#${contentID}`).remove(); })

    $.ajax({
      type: 'DELETE',
      url: "/api/course_content/" + contentID
    }).then((result) => {

    }).catch((err) => {
      console.error(err)
    })
  });


  /*----------  complete a course item   ----------*/
  $(document).on('click', 'a.red', function () {


    let contentID = $(this).data('id')
    let bubbleAdd = $(this).data('value')
    //add to % completion 
    courseTotal += bubbleAdd
    // console.log(`Total after clicking button: ${courseTotal}`)

    if (courseTotal == 100) {
      $.ajax({
        type: "PUT",
        url: "/api/course",
        data: {
          percentComplete: courseTotal,
          id: course
        },
      }).then((result) => { console.table(result) })
        .catch((err) => { console.error(err) })
    }


    bar1.set(courseTotal)

    $(`#${contentID}`).fadeTo("slow", 0.5, function () {
    });

    //now update the %completion within the course table 
    $.ajax({
      type: "PUT",
      url: "/api/course",
      data: {
        percentComplete: courseTotal,
        id: course
      },
    }).then((result) => { console.table(result) })
      .catch((err) => { console.error(err) })
    //update completion status of the content item 
    $.ajax({
      type: "PUT",
      url: "/api/course_content",
      data: { id: contentID }
    }).then((data) => {

    }).catch((err) => {
      console.error(err)
    })
  });


  let createCourseContent = (data) => {
    let output = '<div class="card-columns">';
    //calculate the value to give to each content
    //when the content is complete, it will add to the percent completion 

    addToPercentBubble = (100 / data.length).toFixed()
    //if statment to check if item has been complete
    data.forEach(e => {
      if (e.watched_read) {
        output += `
        <div class="card blue-grey darken-1" id="${e.id}" style="opacity:0.5">
        <img src="${e.image}" class="card-img-top" alt="...">
        <div class="card-body" style="padding-bottom:0px;text-align:center">
          <h5 class="card-title">${e.title}</h5>
          <a href="${e.link}" target="_blank" class="btn btn-primary">Go somewhere</a>
        </div>
        <div class="card-footer text-muted">
          <div class="row">
            <div class="col text-center">
                <a class="btn red" data-id='${e.id}' data-value='${addToPercentBubble}'>
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
      }
      else {
        output += `
            <div class="card blue-grey darken-1" id="${e.id}">
            <img src="${e.image}" class="card-img-top" alt="...">
            <div class="card-body" style="padding-bottom:0px;text-align:center">
              <h5 class="card-title">${e.title}</h5>
              <a href="${e.link}" target="_blank" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">
              <div class="row">
                <div class="col text-center">
                    <a class="btn red" data-id='${e.id}' data-value='${addToPercentBubble}'>
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
      }
      // meterCount += 1
    })
    // console.log(meterCount-1);
    //so each click needs to have a value equeal to 100/n
    output += '</div>';
    document.getElementById('courses-container').innerHTML = output;
  }

});


