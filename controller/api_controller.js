const db = require('../models');
const passport = require('../config/passport');

const addUserToGroup = async (groupId = 'number', userId = 'number') => {
    // just making sure that we are getting integers in here
    groupId = parseInt(groupId);
    userId = parseInt(userId);
    let userGroups = await db.User.findOne({
        where: {
            id: userId
        }
    });
    userGroups = userGroups.dataValues.groupsIds;

    let userGroupsIds;


    if (userGroups === 0) {
        userGroupsIds = [0, groupId];
    } else {
        userGroupsIds = userGroups.map(el => el);
        userGroupsIds.push(groupId);
    }

    userGroupsIds = [...new Set(userGroupsIds)];
    const updatedGroups = [...userGroupsIds];

    await db.User.update({
        groupsIds: updatedGroups
    }, {
        where: {
            id: userId
        }
    });
};

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

            addUserToGroup(newGroup.id, req.user.id);
            console.log(newGroup);

            res.sendStatus(200);
        } catch {
            (error) => console.error(error);
            res.sendStatus(500);
        }
    });

    app.delete('/api/groups/:groupId/delete', async (req, res) => {
        try {
            await db.Group.destroy({
                    where: {
                        id: req.params.groupId
                    }
                })
                .then(() => {
                    res.sendStatus(202);
                });
        } catch {
            error => console.error(error);
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


            addUserToGroup(req.query.group, userId);
            res.sendStatus(201);
        } catch {
            error => console.log(error);
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

    app.post('/api/tasks/add_task', async (req, res) => {
        const newTask = await db.Task.create({
            name: req.body.name,
            notes: req.body.notes,
            belongsTo: req.body.groupId
        }, );
        console.log(newTask);
        res.end();
    });


    // // get tasks assigned to user
    // app.get('/api/users/:id', async (req, res) => {
    //     const dbUser = await db.User.findAll({
    //         where: {
    //             // user id
    //             id: req.params.id
    //         },
    //     });

    //     console.log(dbUser);

    //     res.end();
    // });

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
    app.put('/api/tasks/:id', (req, res) => {
        // from req.body -> get table, column, value for query
        db.Task.update(req.body, {
                where: {
                    // task id
                    id: req.params.id,
                },
            }).then((dbTask) => console.log(dbTask))
            .catch((err) => console.error(err));

        res.end();
    });

    // create task
    app.post('/api/tasks', (req, res) => {
        db.Tasks.create(req.body).then((res) => console.log(res));

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