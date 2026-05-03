$('#course_content').css('display', 'none');

$('#student_sidebar_tab').on('click', function () {
    $('#course_content').css('display', 'none');
    $('#student_content').css('display', 'block');
})

$('#course_sidebar_tab').on('click', function () {
    $('#course_content').css('display', 'block');
    $('#student_content').css('display', 'none');

})