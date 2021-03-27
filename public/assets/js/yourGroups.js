$(document).ready(() => {
    const createGroupBtn = $('#createGroup');

    createGroupBtn.on('click', () => {

        $.post('/api/groups/add_group', {
                name: $('#groupName').val().trim()
            })
            .then((res) => {
                console.log(res);
                // location.reload();
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });

    });

});