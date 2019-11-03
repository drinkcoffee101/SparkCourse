

$(document).ready(function () {

    $("#modal2").iziModal({
        width: 1000
    });
    //create a new progressBAr object so we can invoke the set() method to update the value 
    var bar1 = new ldBar("#bubble-bar");
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    //declared here so course_create api has access to this variable
    let newUserId = 0;
    $.get("/api/user_data").then(function (data) {
        newUserId = data.id;
    });

    /*=============================================
=            Course Creation Page            =
=============================================*/

    $('#create-course').click(function (e) {
        e.preventDefault();
        $('#modal').iziModal('close');
        $('#modal2').iziModal('open');
        var genre = $('#select-genre').val();
        var numberOfContent = $('#select-content').val();
        var focus = $('#select-focus').val();

        let newCourse = {
            resources: numberOfContent,
            genre: genre,
            UserId: newUserId
        }
        /*----------  Course and content generation  ----------*/
        $.ajax({
            method: 'POST',
            url: '/api/course',
            data: newCourse,
        }).then((res) => {
            var course_id = res.id;
            document.cookie = course_id;
            var searchCount = res.resources;
            /*----------  Make 1st call to reddit api  ----------*/
            var search = `${genre} ${focus}`
            /*=============================================
            = might be useful to store the id of the content to check for duplicates  =
            =============================================*/
            $.ajax({
                type: "GET",
                url: `https://www.reddit.com/search.json?q=${search}&sort=relevance&limit=${searchCount}`
            }).then((data) => {
                var mappedData = data.data.children.map(data => data.data);
                /*----------  Enter the contents into the table (POST)  ----------*/
                mappedData.forEach(e => {
                    let contentCode = e.id;
                    let type = 'article';

                    let title = e.title;
                    let link = e.url;
                    let image = e.preview ? e.preview.images[0].source.url : 'https://wearesocial-net.s3.amazonaws.com/wp-content/uploads/2015/07/2A326ECA00000578-3148329-California_based_Reddit_logo_shown_has_fired_an_employee_called_-a-6_1435919411902.jpg';

                    let newContent = {
                        code: contentCode,
                        type: type,
                        focus: focus,
                        title: title,
                        link: link,
                        image: image,
                        course_id: course_id,
                        UserId: newUserId

                    };

                    $.ajax({
                        type: "POST",
                        url: "/api/course_content/",
                        data: newContent,
                    }).then((results) => {
                        bar1.set('50')
                    }).catch((err) => {
                        console.error(err)
                    })
                });
            }).then(() => {
                $.ajax({
                    type: 'POST',
                    url: '/api/youtube',
                    data: {
                        search: search,
                        count: searchCount
                    }
                }).then((data) => {
                    data.forEach((item) => {
                        let newContent = {
                            code: item.code,
                            type: 'video',
                            focus: focus,
                            title: item.title,
                            link: item.link,
                            image: item.image,
                            course_id: course_id,
                            UserId: newUserId
                        }
                        $.ajax({
                            type: "POST",
                            url: "/api/course_content/",
                            data: newContent
                        }).then((results) => {
                        }).catch((err) => {
                            console.error(err)
                        })
                    })
                    $('#modal2').iziModal('close');
                    window.location.reload();
                }).catch((err) => {
                    console.error(err)
                })
            })
                .catch((err) => { console.error(err) });
        });
    });
    /*----------  Initialize Materialize Form  ----------*/
    $('select').formSelect();
});