// user_db_array
let user_db_array = [{name:"chathura@gmail.com", password:"12345678"}];

// login
// login check
$('#log_in_btn').on('click', function () {
    let username = $('#email_input').val();
    let password = $('#password_input').val();

    let user = user_db_array.find(u => u.name == username && u.password == password);

    if (user) {
        $('#login_content').addClass('d-none');
        $('#login_navbar').addClass('d-none');
        $('#dashboard_content').removeClass('d-none');
        $('#dashboard_navbar').removeClass('d-none');
    } else {
        alert('Invalid username or password');
    }
})