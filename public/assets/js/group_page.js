$(document).ready(() => {
    const addUserForm = $('#addUserForm');
    const addTaskForm = $('#createTask');

    addUserForm.on('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let username = $('#addUser').val();
        let groupId = addUserForm.attr('data-id');

        console.log(username, groupId);

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
        const newTaskName = $('input#taskName').val().trim();
        const newTaskNotes = $('textarea').val().trim();
        const newTaskOwner = $('option:selected').attr('value');
        const newTaskObj = {
            name: newTaskName,
            notes: newTaskNotes,
        };

        $.post(`/api/tasks/${newTaskOwner}`, newTaskObj)
            .then(() => {
                console.log('Added task');
            })
            .catch(error => {
                console.log(error);
            });

    });
});