'use strict';

$('#textChange').click(function () {

    var status = $('#btnLoginToRegister').text();

    if (status === 'Login') {
        $('#btnLoginToRegister').text('Register');
        $('#loginToRegister').text('Already registered?');
        $(this).text('Login');
        $('.register').slideDown();
    } else if (status === 'Register') {
        $('#btnLoginToRegister').text('Login');
        $('#loginToRegister').text('Not registered?');
        $(this).text('Register');
        $('.register').slideUp();
    }
});
//# sourceMappingURL=login.js.map
//# sourceMappingURL=login.js.map
//# sourceMappingURL=login.js.map
//# sourceMappingURL=login.js.map
//# sourceMappingURL=login.js.map
//# sourceMappingURL=login.js.map
