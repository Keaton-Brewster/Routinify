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

    document.querySelector('.login').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit');

        const userData = {
            email: document.getElementById('email-input').value.trim(),
            password: document.getElementById('password-input').value.trim()
        };

        if (userData.email && userData.password) {
            login(userData);
        }
    });

});