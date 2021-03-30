$(document).ready(() => {
    const addUserForm = $('#addUserForm');
    const addTaskForm = $('#createTask');
    const completeTaskBtns = document.querySelectorAll('.completeTask');
    const deleteTaskBtns = document.querySelectorAll('.deleteTask');
    const removeUserBtns = document.querySelectorAll('.removeUser');

    addUserForm.on('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let username = $('#addUser').val();
        let groupId = addUserForm.attr('data-id');

        username = encodeURIComponent(username);
        groupId = encodeURIComponent(groupId);

        $.post(`/api/groups/add_user_by_username/?user=${username}&group=${groupId}`)
            .then(() => {
                location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    });

    addTaskForm.on('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const sel = $('#usersInGroup');
        const assignedId = parseInt(sel.find('option:selected').attr('id'));
        const newTaskObj = {
            name: $('input#taskName').val().trim(),
            notes: $('textarea').val().trim(),
            groupId: $('span#group').attr('data-id'),
            assignedTo: assignedId
        };

        $.post('/api/tasks/add_task', newTaskObj)
            .then(() => {
                console.log('Added task');
                location.reload();
            })
            .catch(error => {
                console.log(error);
            });

    });

    completeTaskBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const taskId = e.target.getAttribute('data-id');

            $.ajax({
                url: `/api/tasks/${taskId}`,
                type: 'PUT',
                data: {
                    isCompleted: true
                }
            })
                .done(() => {
                    alert('Task complete!');
                    location.reload();
                });

        });
    });

    deleteTaskBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const taskId = e.target.getAttribute('data-id');

            $.ajax({
                url: `/api/tasks/${taskId}`,
                type: 'DELETE',
            })
                .done(() => {
                    alert('Task deleted!');
                    location.reload();
                });

        });
    });

    removeUserBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const userId = e.target.getAttribute('data-id');
            const groupId = e.target.getAttribute('data-group');
            const userName = e.target.getAttribute('data-name');

            console.log(groupId);

            const confirmRemove = confirm(`Are you sure you want to remove "${userName}" from this group?`);
            if (confirmRemove) {
                $.ajax({
                    type: 'PUT',
                    url: `/api/groups/remove-user/?userId=${userId}&groupId=${groupId}`
                })
                    .then(() => {
                        location.reload();
                    })
                    .catch(error => console.error(error));
            }
        });
    });
});