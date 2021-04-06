const assignedEls = $('.assigned');
const groupIdEls = $('.groupids');

async function getAssignments(elements) {
    let result;
    for (const p of elements) {
        const uid = parseInt(p.getAttribute('data-id'));
        result = await $.ajax({
            url: `/api/users/${uid}`,
            method: 'GET'
        });
        p.append(`Assigned to: ${result.username}`);
    }
}

async function getGroupNames(elements) {
    let result;
    for (const p of elements) {
        const groupId = parseInt(p.getAttribute('data-id'));
        result = await $.ajax({
            url: `/api/groups/get_group_name/${groupId}`,
            method: 'GET'
        });
        p.append(`${result.name}`);
    }
}



getAssignments(assignedEls);
getGroupNames(groupIdEls);