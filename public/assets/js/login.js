document.addEventListener('DOMContentLoaded', () => {

    const login = (user) => {
        $.post('/api/login', user)
            .then((data) => {
                data = JSON.stringify(data);
                //* below if what data will look like (data being req.user)
                // {
                //     "id": 2,
                //     "username": "foo",
                //     "email": "foo@bar.fo",
                //     "password": "$2a$10$Jx9EDvrKpxzxdSkqT0e14escXpdVb6kjq0JKTps/CmDD0SMmLK8Du",
                //     "isAdmin": false,
                //     "createdAt": "2021-03-22T22:59:47.000Z",
                //     "updatedAt": "2021-03-22T22:59:47.000Z"
                //* add "groups": [];
                // }

                return data;
            }).then(user => {
                $.get(`/users/home/${user}`)
                    .catch(error => console.error(error));
            });

    };

    document.querySelector('#login').addEventListener('submit', () => {
        const userEmail = $('input#user').val();
        const userPassword = $('input#password').val();

        const userData = {
            email: userEmail,
            password: userPassword
        };

        if (userData.email && userData.password) {
            login(userData);
        }
    });
});