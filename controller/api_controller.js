const db = require('../models');
const passport = require('../config/passport');

module.exports = (app) => {
    app.post('/api/sign_up', (req, res) => {
        db.User.create(req.body)
            .then(() => {
                res.sendStatus(207);
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

    app.post('/api/groups/add_group', async (req, res) => {
        try {
            const newGroup = await db.Group.create({
                name: req.body.name,
                ownerId: req.user.id
            });

            const groupId = encodeURIComponent(newGroup.id);
            const user = encodeURIComponent(req.user.id);
            res.redirect(`/api/users/add_user_to_group/?group=${groupId}&user=${user}`);
        } catch {
            (error) => console.error(error);
            res.sendStatus(500);
        }
    });

    app.post('/api/groups/add_user_by_username', async (req, res) => {
        try {
            const username = decodeURIComponent(req.query.user);
            let userId = await db.User.findOne({
                where: {
                    username: username
                },
                attributes: ['id']
            });
            userId = encodeURIComponent(userId.dataValues.id);

            res.redirect(`/api/users/add_user_to_group/?group=${req.query.group}&user=${userId}`);
        } catch {
            error => console.error(error);
        }
    });

    app.get('/api/users/add_user_to_group/', async (req, res) => {
        try {
            const groupIdFromQuery = parseInt(decodeURIComponent(req.query.group));
            const userIdFromQuery = decodeURIComponent(req.query.user);

            let userGroups = await db.User.findOne({
                where: {
                    id: userIdFromQuery
                },
                attributes: ['groupsIds']
            });
            userGroups = JSON.parse(userGroups.dataValues.groupsIds);

            let userGroupsIds = [];

            if (userGroups === 0) {
                userGroupsIds = [0, groupIdFromQuery];
            } else {
                userGroups.forEach(el => userGroupsIds.push(el));
                userGroupsIds.push(groupIdFromQuery);
            }

            userGroupsIds = [...new Set(userGroupsIds)];
            userGroupsIds = [...userGroupsIds];

            const updatedGroups = JSON.stringify(userGroupsIds);

            await db.User.update({
                    groupsIds: updatedGroups
                }, {
                    where: {
                        id: userIdFromQuery
                    }
                })
                .catch(error => console.error(error));
            res.sendStatus(200);

        } catch {
            error => {
                console.error(error);
                res.sendStatus(500);
            };
        }
    });

    app.get('/api/groups', async (req, res) => {
        try {
            const groups = await db.Group.findAll({});
            if (groups) {
                res.json(groups);
            } else {
                res.sendStatus(404);
            }
        } catch {
            res.sendStatus(500);
        }
    });

    // To add an existing user to a group
    //todo MAKE THIS WORK
    app.put('/api/group/add_user', (req, res) => {
        res.end();
    });

    //! delete later, just added for viewing the json
    app.get('/api/users/groups', (req, res) => {
        db.Group.findAll({
            where: {
                ownerId: req.user.id
            }
        }).then(users => {
            res.json(users);
        });
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