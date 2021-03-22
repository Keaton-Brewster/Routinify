document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.querySelector('#sign-up');

    const insertNewUserData = (newUserData = {
        username: 'string',
        email: 'email',
        password: 'password',
        isAdmin: false
    }) => {
        fetch('/api/sign_up', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData)
            }).then()
            .catch(error => console.error(error));
    };

    signUpButton.addEventListener('click', (e) => {
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

        if (newUser.username === confirmUsername) {
            if (newUser.email === confirmEmail) {
                if (newUser.password === confirmPassword) {
                    insertNewUserData(newUser);
                } else {
                    alert('Passwords do not match');
                }
            } else {
                alert('Emails do not match');
            }
        } else {
            alert('Usernames do not match');
        }
    });
});