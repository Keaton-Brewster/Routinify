document.addEventListener('DOMContentLoaded', () => {


    const login = (user) => {
        return new Promise((resolve, reject) => {
            const {
                id
            } = $.post('/api/login', user);
            if (id) {
                resolve(id);
            }
            reject("something went wrong");
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
            login(userData).then(id => {
                $.get(`/users/home/${id}`)
                    .catch(error => console.error(error));
            });
        }
    });
});