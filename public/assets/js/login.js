document.addEventListener('DOMContentLoaded', () => {

    // const login = (user) => {
    //     //! Switched to jQuery because for some reason the body was messing up the request.
    //     // fetch('/api/login', {
    //     //         method: 'POST',
    //     //         headers: {
    //     //             accept: 'json',
    //     //             'Content-Type': 'json/application'
    //     //         },
    //     //         body: JSON.stringify(user)
    //     //     })
    //     //     .then(() => {
    //     //         window.location.replace('/users/home');
    //     //     })
    //     //     .catch(error => console.log(error));

    // };

    document.querySelector('#login').addEventListener('submit', (e) => {
        e.preventDefault();
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