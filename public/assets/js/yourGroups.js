$(document).ready(() => {
    const createGroupBtn = $('#createGroup');
    const deleteGroupBtn = $('#deleteGroup');

    createGroupBtn.on('click', () => {

        $.post('/api/groups/add_group', {
                name: $('#groupName').val().trim()
            })
            .then((res) => {
                console.log(res);
                location.reload();
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });

    });

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
    });
});