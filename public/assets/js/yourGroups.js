$(document).ready(() => {
    const createGroupBtn = $('#createGroup');
    const deleteGroupBtn = document.querySelectorAll('.deleteGroup');
    const groupModal = $('#groupModal');
    const createGroupToast = document.getElementById('createGroupToast');

    function toast() {
        createGroupToast.className = 'show';
        setTimeout(() => {
            createGroupToast.className = createGroupToast.className.replace('show', '');
        }, 3000);
    }

    createGroupBtn.on('click', async () => {
        groupModal.hide();
        //! toast() is not working!
        toast();

        await $.post('/api/groups/add_group', {
                name: $('#newGroupName').val().trim()
            })
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });

        location.reload();
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

    groupModal.on('show.bs.modal', async (e) => {

    });
});