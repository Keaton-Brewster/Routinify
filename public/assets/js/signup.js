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
        const newUserUsername = document.getElementById('username-input').value;
        const newUserEmail = document.getElementById('email-input').value;
        const newUserPassword = document.getElementById('password-input').value;

        const newUser = {
            username: newUserUsername,
            email: newUserEmail,
            password: newUserPassword,
            isAdmin: false
        };

        insertNewUserData(newUser);
    });


});