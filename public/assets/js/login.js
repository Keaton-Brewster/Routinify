document.addEventListener('DOMContentLoaded', () => {


    // const login = (user) => {
    //     // return new Promise((resolve, reject) => {
    //     $.post('/api/login', user);
    //         // .then(() => {
    //         //     // const {
    //         //     //     id
    //         //     // } = userData;
    //         //     // if (id) {
    //         //     //     resolve(id);
    //         //     // } else {
    //         //     //     reject('something is off');
    //         //     // }
    //         //     // });
    //         //     // window.location.replace('/users/home');
    //         // });
    // };



    document.querySelector('#login_button').addEventListener('click', () => {
        const userEmail = $('input#user').val();
        const userPassword = $('input#password').val();

        const userData = {
            email: userEmail,
            password: userPassword
        };

        if (userData.email && userData.password) {

            $.post('/api/login', userData);
            // login(userData);
            // login(userData).then(id => {
            //     $.get(`/users/home/${id}`)
            //         .catch(error => console.error(error));
            // });

        }

    });
});