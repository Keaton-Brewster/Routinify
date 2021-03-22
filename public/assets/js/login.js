document.addEventListener('DOMContentLoaded', () => {

    const login = (user) => {
        fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'json/application'
                },
                body: JSON.stringify(user)
            }).then(() => {
                window.location.replace('/users/home');
            })
            .catch(error => console.log(error));
    };

    document.querySelector('#login').addEventListener('submit', (e) => {
        e.preventDefault();
        const userEmail = document.getElementById('user').value.trim();
        const userPassword = document.getElementById('password').value.trim();

        const userData = {
            email: userEmail,
            password: userPassword
        };

        if (userData.email && userData.password) {
            login(userData);
        }
    });

});