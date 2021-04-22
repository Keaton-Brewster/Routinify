window.onload = () => {
    const routinifyTasks = [];
    const newRoutineName = document.querySelector('#newRoutineName');
    const addTaskBtns = document.querySelectorAll('.btn.btn-primary');
    const userIdSpan = document.querySelector('#userId')
    addTaskBtns.forEach((btn) => {
        const taskId = parseInt(btn.getAttribute('id'));
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            routinifyTasks.push(taskId);
            e.currentTarget
                .parentNode
                .parentNode
                .style.display = 'none';
        });
    });

    // Example POST method implementation:
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response;
    }

    const createRoutineBtn = document.querySelector('#createNewRoutine');
    createRoutineBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const userId = parseInt(userIdSpan.textContent);
        const newRoutineObj = {
            name: newRoutineName.value.trim(),
            tasks: routinifyTasks,
            ownerId: parseInt(userId)
        };
        postData('/api/routines/new', newRoutineObj)
            .then((response) => {
                console.log(response);
                location.reload();
            });
    });
};