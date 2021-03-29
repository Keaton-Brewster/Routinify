$(document).ready(() => {
    const addUserForm = $('#addUserForm');
    const addTaskForm = $('#createTask');

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

        const newTaskObj = {
            name: $('input#taskName').val().trim(),
            notes: $('textarea').val().trim(),
            groupId: $('span#group').attr('data-id')
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

<<<<<<< HEAD
    const deleteGroupBtn = $('#deleteGroup');


    deleteGroupBtn.on('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const groupName = deleteGroupBtn.attr('data-name');
        const groupId = deleteGroupBtn.attr('data-id');
        const confirmDelete = confirm(`Are you sure you want to delete: "${groupName}"`);
        if (confirmDelete) {
            $.ajax({
                    url: `/api/groups/${groupId}/delete`,
                    type: 'DELETE'
                })
                .catch(error => console.error(error));

        }
        return;
=======
    $('#completeTask').on('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const taskId = $('#completeTask').attr('data-id');

        $.ajax({
            url: `/api/tasks/${taskId}`,
            type: 'PUT',
            data: { isCompleted: true }
        })
            .done(() => {
                alert('Task complete!');
                location.reload();
            });

>>>>>>> 739e4be051e2597a6cfdb96d687bbb7def8c04cf
    });
});