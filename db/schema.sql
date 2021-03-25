CREATE DATABASE the_whiteboard;
USE the_whiteboard;
CREATE TABLE groups (
    id INTEGER AUTO_INCREMENT NOT NULL,
    group VARCHAR NOT NULL,
    FOREIGN KEY (many users)
);
CREATE TABLE users (
    id INTEGER AUTO_INCREMENT NOT NULL,
    user VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    FOREIGN KEY (
        many tasks,
        or routines
    )
);
CREATE TABLE routines (
    id INTEGER AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    routine VARCHAR NOT NULL
);
CREATE TABLE messages (
    id INTEGER AUTO_INCREMENT NOT NULL,
    body TEXT NOT NULL,
    isRead BOOLEAN NOT NULL
);
/* below if what data will look like (data being req.user)
 {
 "id": 2,
 "username": "foo",
 "email": "foo@bar.fo",
 "password": "$2a$10$Jx9EDvrKpxzxdSkqT0e14escXpdVb6kjq0JKTps/CmDD0SMmLK8Du",
 "isAdmin": false,
 "createdAt": "2021-03-22T22:59:47.000Z",
 "updatedAt": "2021-03-22T22:59:47.000Z"
 add "groups": [];
 }
 
 How we want the group to look: 
 {
 "id": 1,
 "group": "group name",
 "routines": [foreign keys relating to routines?],
 "owner": foreignKey(userID),
 }
 
 How routines need to look 
 {
 "id": autoIncr,
 "routine": "routine name"
 "tasks": [task IDs],
 "assignees": [user IDs],
 "complete": boolean
 }
 
 How tasks need to look 
 {
 "id": autoIncr,
 "task": "take out trash"
 "complete": boolean
 }
 */