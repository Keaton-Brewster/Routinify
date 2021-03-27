    $(document).ready(() => {
        //todo Need to get this to do the initial loading of all db data, with a specific fetch. 
        //todo Then the controller will handle the rendering of the db data thru hbs

        const createGroupForm = $('#createGroupForm');
        const userForm = $('#userForm');
        const finishedDiv = $('#finished');

        const newGroupObj = {};
        const newUsers = [];

        groupForm.css('display', 'none');
        userForm.css('display', 'none');
        finishedDiv.css('display', 'none');

        function clearUserForm($form) {
            $form.find('input:text, input:password').val('');
        }

        // $('#create').on('click', (e) => {
        //     e.preventDefault();
        //     groupForm.css('display', 'block');
        // });

        //! just changing stuff so that the script works with the handlebars maggie made
        createGroupForm.on('submit', (e) => {
            e.preventDefault();
            const newGroupName = $('#groupName').val().trim();
            newGroupObj.name = newGroupName.toLowerCase().split(' ').join('_');
            // $('.newGroupName').text(newGroupName);
            //? just commenting out for dev
            // // userForm.css('display', 'block');
            // // $('#newGroup').attr('readonly', true);
            // // $('#createGroup').css('display', 'none');
            // Don't send post request yet
            $.post('/api/groups/add_group', newGroupObj)
                .then(() => {
                    location.reload();
                })
                .catch((error) => {
                    console.error(`Error homepage.js line 37: ${error}`);
                });
        });

        $('#createUser').on('click', (e) => {
            e.preventDefault();
            const newUserObj = {
                username: $('#newUsername').val().trim().toLowerCase().split(' ').join('_'),
                email: $('#newEmail').val().trim(),
                password: $('#newPassword').val().trim()
            };

            newUsers.push(newUserObj);
            $('#createUser').text('Add another User');
            finishedDiv.css('display', 'block');
            console.log('New User: ', newUserObj);
            console.log(newUsers);
            clearUserForm($('#userForm'));
            // Wait until all new users have been added to send the POST request
        });
        // $('#')
        //     const newGroup = {name: 'myGroup'};
        //     $.post('/api/groups', newGroup).then(() => {
        //         window.location.replace('/api/groups');
        //     }).catch(err => console.error(err));

    });