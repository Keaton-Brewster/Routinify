document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.querySelector('#sign-up');

    const insertNewUserData = (newUserData = {
        username: 'string',
        email: 'email',
        password: 'password',
        isAdmin: false
    }) => {
        fetch('/api/signUp', {
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
        const newUserUsername = document.getElementById('signupUsername').value.trim();
        const confirmUsername = document.getElementById('confirmUsername').value.trim();
        const newUserEmail = document.getElementById('signupEmail').value.trim();
        const confirmEmail = document.getElementById('confirmEmail').value.trim();
        const newUserPassword = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        const newUser = {
            username: newUserUsername,
            email: newUserEmail,
            password: newUserPassword,
            isAdmin: false
        };

        if (newUserUsername === confirmUsername) {
            if (newUserEmail === confirmEmail) {
                if (newUserPassword === confirmPassword) {
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