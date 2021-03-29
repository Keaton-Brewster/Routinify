$(document).ready(() => {
    const createGroupBtn = $('#createGroup');
    const deleteGroupBtn = document.querySelectorAll('.deleteGroup');

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

    deleteGroupBtn.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const groupName = e.target.getAttribute('data-name');
            const groupId = e.target.getAttribute('data-id');
            const confirmDelete = confirm(`Are you sure you want to delete: "${groupName}"`);
            if (confirmDelete) {
                $.ajax({
                        url: `/api/groups/${groupId}/delete`,
                        type: 'DELETE'
                    })
                    .then(() => {
                        location.reload();
                    })
                    .catch(error => console.error(error));

            }
            return;
        });
    });
});