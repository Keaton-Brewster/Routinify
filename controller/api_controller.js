const db = require('../models');
const passport = require('../config/passport');

module.exports = (app) => {
    app.post('/api/sign_up', (req, res) => {
        console.log(req.body);
        db.User.create(req.body).then((dbRes) => {
            console.log(dbRes);
            res.redirect(200, '/');
        });
    });

    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        // got the simple bit of authentication working. You have to already have an account to 'sign in'
        // now just have to figure out what we want thing to look like after we sign in?
        res.end();
    });


    // these are the user routes for when logged in

    // I'm literally making up the structure, so we'll need to revisit that when it's set
    // any authorization stuff will have to be added around/in  



    // get tasks assigned to user
    app.get('/api/users/:id', (req, res) => {
        // the includes are obviously placeholder text
        db.User.findAll({
            include: ['tasks', 'routines'],
            where: {
                // user id
                id: req.params.id
            },
        }).then((dbUser) => console.log(dbUser));
    });

    // get unassigned tasks (admin only?)
    app.get('/api/tasks', (req, res) => {
        db.Tasks.findAll({
            include: ['tasks', 'routines'],
            where: 'no user id assigned',
        }).then((dbTasks) => console.log(dbTasks));
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
    });

    // create routine
    app.post('/api/routines', (req, res) => {
        db.Routine.create(req.body).then((res) => console.log(res));
    });

    // create task
    app.post('/api/tasks', (req, res) => {
        db.Tasks.create(req.body).then((res) => console.log(res));
    });

    // create request (for asking someone else to do a task)
    app.post('/api/messages', (req, res) => {
        db.Message.create(req.body).then((res) => console.log(res));
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

    });

    // I remember something about needing to return something, but I'm not sure how to apply that until we have a better idea of what's going where. Does that need to happen in each or all of it at the end?

};