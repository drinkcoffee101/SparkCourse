

$(document).ready(function () {
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
        var genre = $('#select-genre').val();
        var numberOfContent = $('#select-content').val();
        var focus = $('#select-focus').val();

        let newCourse = {
            course_name: 'somthing really cool',
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
                    //don't need to reassign

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

                    }).catch((err) => {
                        console.error(err)
                    })
                });
            }).then(() => {
                $.ajax({
                    type: 'GET',
                    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&videoEmbeddable=true&q=${genre}+${focus}&maxResults=${numberOfContent}&key=AIzaSyD5KalQx38fMYYOaUHTalLlKFYgUGylBfE`
                }).then((data) => {
                    data.items.forEach(item => {
                        let newContent = {
                            code: item.id.videoId,
                            type: 'video',
                            focus: focus,
                            title: item.snippet.title,
                            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                            image: item.snippet.thumbnails.high.url,
                            course_id: course_id,
                            UserId: newUserId
                        }
                        $.ajax({
                            type: "POST",
                            url: "/api/course_content/",
                            data: newContent,
                        }).then((results) => {
                            window.location.reload();
                        }).catch((err) => {
                            console.error(err)
                        })
                    })
                    window.location.reload();
                }).catch((err) => {
                    console.error(err)
                })
                // window.location.reload();
            })
                .catch((err) => { console.error(err) });
        });
    });
    /*----------  Initialize Materialize Form  ----------*/
    $('select').formSelect();
});