document.addEventListener('DOMContentLoaded', () => {
    const loginForm = $('#login');

    loginForm.on('submit', () => {
        const userEmail = $('input#user').val();
        const userPassword = $('input#password').val();

        const userData = {
            email: userEmail,
            password: userPassword
        };

        if (userData.email && userData.password) {
            $.post('/api/login', userData)
                .then(() => {
                    location.reload();
                })
                .catch(error => console.log(error));
        }
    });
});