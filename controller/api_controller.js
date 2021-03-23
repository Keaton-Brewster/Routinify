const db = require('../models');
const passport = require('../config/passport');

module.exports = (app) => {
    app.post('/api/sign_up', (req, res) => {
        db.User.create(req.body)
            .then(() => {
                res.send(207);
            })
            .catch(error => {
                res.status(401).json(error);
            });
    });

    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        // got the simple bit of authentication working. You have to already have an account to 'sign in'
        // now just have to figure out what we want thing to look like after we sign in?
        res.redirect('/users/home');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/api/groups', async (req, res) => {
        try {
            const newGroup = await db.Group.create({
                name: req.body.name,
            });
            console.log(newGroup);
        } catch {
            (error) => console.error(error);
        }
        res.end();
    });

    app.get('/api/groups', (req, res) => {
        res.json();
    });

    // these are the user routes for when logged in

    // I'm literally making up the structure, so we'll need to revisit that when it's set
    // any authorization stuff will have to be added around/in  


    // get tasks assigned to user
    app.get('/api/users/:id', async (req, res) => {
        const dbUser = await db.User.findAll({
            include: ['Groups'],
            where: {
                // user id
                id: req.params.id
            },
        });

        console.log(dbUser);

        res.end();
    });

    // get unassigned tasks (admin only?)
    app.get('/api/tasks', (req, res) => {
        db.Tasks.findAll({
            include: ['tasks', 'routines'],
            where: 'no user id assigned',
        }).then((dbTasks) => console.log(dbTasks));

        res.end();
    });

    // get messages (requests) logged in user = receiver id (OR response message where user = sender id)
    app.get('/api/users/messages/', (req, res) => {
        db.Messages.findAll({
            include: 'messages',
            // don't know the right syntax for including the or, so commenting the roughed out version, or maybe variable that includes both and then assign where that =req?
            // where: {
            //     'senderId': req.params.id || 'receiverId': req.params.id
            // }
        }).then((dbMessages) => console.log(dbMessages));

        res.end();
    });

    // update task
    app.post('/api/tasks/:id', (req, res) => {
        // from req.body -> get table, column, value for query
        db.Tasks.updateOne(req.body, {
            where: {
                // task id
                id: req.body.id,
            },
        }).then((dbTask) => console.log(dbTask));

        res.end();
    });

    // update request (accept)(deny)
    app.post('/api/messages/:id', (req, res) => {
        // from req.body -> get table, column, value for query
        db.Messages.updateOne(req.body, {
            where: {
                // message id
                id: req.body.id,
            },
        }).then((dbMessage) => console.log(dbMessage));

        res.end();
    });

    // create routine
    app.post('/api/routines', (req, res) => {
        db.Routine.create(req.body).then((res) => console.log(res));

        res.end();
    });

    // create task
    app.post('/api/tasks', (req, res) => {
        db.Tasks.create(req.body).then((res) => console.log(res));

        res.end();
    });

    // create request (for asking someone else to do a task)
    app.post('/api/messages', (req, res) => {
        db.Message.create(req.body).then((res) => console.log(res));

        res.end();
    });

    // delete routine
    app.delete('/api/routines/:id', (req, res) => {
        db.Routine.destroy({
            where: {
                // routine id
                id: req.params.id,
            },
            // (result) => {
            //     if (result.changedRows === 0) {
            //         return res.status(404).end();
            //     } else {
            //         res.status(200).end();
            //     };
            // }
        });

        res.end();
    });

    // delete user
    app.delete('/api/user/:id', (req, res) => {
        db.User.destroy({
            where: {
                // user id
                id: req.params.id,
            },
            // }).then(res) {
            //     console.log(res);   
            // };
        });

        res.end();
    });

    // delete tasks
    app.delete('/api/tasks/:id', (req, res) => {
        db.Task.destroy({
            where: {
                // task id
                id: req.params.id,
            },
            // }).then(res) {
            //     console.log(res);   
            // };
        });

        res.end();
    });
    // I remember something about needing to return something, but I'm not sure how to apply that until we have a better idea of what's going where. Does that need to happen in each or all of it at the end?

};