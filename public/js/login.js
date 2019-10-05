$(document).ready(() => {
    $('#submit').click(function (e) {
        e.preventDefault();
        console.log('hi');

        var testCRUD = {
            email: $('#test1').val().trim(),
            password: $('#test2').val().trim()
        }

        $.ajax({
            method: 'POST',
            url: '/api/signup',
            data: testCRUD
        }).then(() =>{
            // window.location.href = '/course_create';
        })
    });
});