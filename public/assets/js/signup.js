document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('sign-up-form');
    const backToSignIn = document.getElementById('back2signIn');

    const insertNewUserData = (newUserData = {
        username: 'string',
        email: 'email',
        password: 'password',
    }) => {
        $.post('/api/sign_up', newUserData)
            .then(() => {
                window.location.replace('/');
            })
            .catch(error => console.error(error));
    };

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const confirmUsername = $('#confirmUsername').val();
        const confirmEmail = $('#confirmEmail').val();
        const confirmPassword = $('#confirmPassword').val();

        const newUser = {
            username: $('#signupUsername').val(),
            email: $('#signupEmail').val(),
            password: $('#password').val(),
        };

        if (!confirmUsername || newUser.username !== confirmUsername) {
            alert('Usernames do not match, or are left empty');
            return;
        } else if (!confirmEmail || newUser.email !== confirmEmail) {
            alert('Emails do not match');
            return;
        } else if (!confirmPassword || newUser.password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log(newUser);
        insertNewUserData(newUser);
    });

    // backToSignIn.addEventListener('click', () => {
    //     $.get('/')
    // })
});