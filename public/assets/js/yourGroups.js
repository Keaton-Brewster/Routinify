$(document).ready(() => {
    const newGroupObj = {};
    const createGroupBtn = $("#createGroup");

    createGroupBtn.on('click', (e) => {
        e.preventDefault();
        const newGroupName = $('#groupName').val().trim();
        newGroupObj.name = newGroupName.toLowerCase().split(' ').join('_');


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