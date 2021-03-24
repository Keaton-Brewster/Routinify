document.addEventListener('DOMContentLoaded', () => {
    //todo Need to get this to do the initial loading of all db data, with a specific fetch. 
    //todo Then the controller will handle the rendering of the db data thru hbs
    const createGrp = $('#create');

    createGrp.on('click', (e) => {
        const newGroup = {name: 'myGroup'};
        e.preventDefault();
        $.post('/api/groups', newGroup).then(() => {
            window.location.replace('/api/groups');
        }).catch(err => console.error(err));
    });

    
});