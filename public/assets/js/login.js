document.addEventListener('DOMContentLoaded', () => {

    const login = (user) => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    };

    document.querySelector('#login').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit');

        const userData = {
            email: document.getElementById('user').value.trim(),
            password: document.getElementById('password').value.trim()
        };

        if (userData.email && userData.password) {
            login(userData);
        }
    });

});