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
        const newUserUsername = document.getElementById('signupUsername').value;
        const confirmUsername = document.getElementById('confirmUsername').value;
        const newUserEmail = document.getElementById('signupEmail').value;
        const confirmEmail = document.getElementById('confirmEmail').value;
        const newUserPassword = document.getElementById('password').value;

        const newUser = {
            username: newUserUsername,
            email: newUserEmail,
            password: newUserPassword,
            isAdmin: false
        };

        insertNewUserData(newUser);
    });


});