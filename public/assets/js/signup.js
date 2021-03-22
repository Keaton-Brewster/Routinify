document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('sign-up-form');

    const insertNewUserData = (newUserData = {
        username: 'string',
        email: 'email',
        password: 'password',
        isAdmin: false
    }) => {
        $.post('/api/sign_up', newUserData)
            .then(() => {
                window.location.replace('/');
            })
            .catch(error => console.error(error));
    };

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const confirmUsername = document.getElementById('confirmUsername').value.trim();
        const confirmEmail = document.getElementById('confirmEmail').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        const newUser = {
            username: document.getElementById('signupUsername').value.trim(),
            email: document.getElementById('signupEmail').value.trim(),
            password: document.getElementById('password').value.trim(),
            isAdmin: false
        };

        if (!confirmUsername && newUser.username !== confirmUsername) {
            alert('Usernames do not match, or are left empty');
            return;
        }
        if (!confirmEmail && newUser.email !== confirmEmail) {
            alert('Emails do not match');
            return;
        }
        if (!confirmPassword && newUser.password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        insertNewUserData(newUser);


    });
});