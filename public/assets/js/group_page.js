$(document).ready(() => {
    const addUserForm = $('#addUserForm');

    addUserForm.on('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let username = $('#addUser').val();
        let groupId = addUserForm.attr('data-id');

        console.log(username, groupId);

        username = encodeURIComponent(username);
        groupId = encodeURIComponent(groupId);

        $.post(`/api/groups/add_user_by_username/?user=${username}&group=${groupId}`)
            .catch(error => {
                console.log(error);
            });
    });
});