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
            error => console.error(error);
        }
    });

    app.put('/api/groups/remove-user/', async (req, res) => {
        try {
            const userId = req.query.userId;
            const groupId = parseInt(req.query.groupId);

            let userGroups = await db.User.findOne({
                where: {
                    id: userId
                }
            });
            userGroups = userGroups.dataValues.groupsIds;

            userGroups = userGroups.filter(id => id !== groupId);

            await db.User.update({
                groupsIds: userGroups
            }, {
                where: {
                    id: userId
                }
            });
            res.sendStatus(200);
        } catch {
            () => res.sendStatus(500);
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

    app.get('/api/groups/get_group_name/:id', async (request, response) => {
        try {
            const group = await db.Group.findOne({
                where: {
                    id: request.params.id
                }
            });
            if (group) {
                response.send(group);
            } else {
                response.sendStatus(404);
            }
        } catch {
            error => console.error(error);
        }
    });

    app.get('/api/tasks', async (req, res) => {
        try {
            const tasks = await db.Task.findAll({});
            if (tasks) {
                res.json(tasks);
            } else {
                res.sendStatus(404);
            }
        } catch {
            res.sendStatus(500);
        }
    });

    app.get('/api/tasks/:id', async (req, res) => {
        try {
            const task = await db.Task.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (task) {
                res.send(task);
            } else {
                res.sendStatus(404);
            }
        } catch {
            res.sendStatus(500);
        }
    });

    app.get('/api/users/:id', async (req, res) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (user) {
                res.send(user);
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
            belongsTo: req.body.groupId,
            UserId: req.body.assignedTo
        });
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
            })
            .catch((err) => console.error(err));

        res.end();
    });

    // create task
    app.post('/api/tasks', (req, res) => {
        db.Tasks.create(req.body);
        res.end();
    });

    // delete tasks
    app.delete('/api/tasks/:id', (req, res) => {
        db.Task.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.end();
    });

};