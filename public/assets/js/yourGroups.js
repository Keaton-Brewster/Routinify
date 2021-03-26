$(document).ready(() => {
    const newGroupObj = {};
    const createGroupBtn = $("#createGroup");

    createGroupBtn.on('click', (e) => {
        e.preventDefault();
        newGroupObj.name = $('#groupName').val().trim();

        $.post('/api/groups/add_group', newGroupObj)
            .then((res) => {
                console.log(res);
                location.reload();
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });
    });

});