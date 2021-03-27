DROP DATABASE IF EXISTS hr_db;
CREATE DATABASE hr_db;

USE hr_db;

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT NOT NULL,
    userName VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE tasks (
    id INTEGER AUTO_INCREMENT NOT NULL,
    task VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE routines (
    id INTEGER AUTO_INCREMENT NOT NULL,
    routine VARCHAR(30),
    PRIMARY KEY(id)
);
CREATE TABLE messages (
    id INTEGER AUTO_INCREMENT NOT NULL,
    request VARCHAR(220),
    PRIMARY KEY(id)
);

INSERT INTO users (userName)    
VALUES ("Georges", "Sally", "Uta", "River", "Tashala");

INSERT INTO tasks (task)    
VALUES ("take out trash", "do dishes", "call mom");

INSERT INTO routines (routine)    
VALUES ("after school", "dinnertime", "bedtime");

INSERT INTO messages (request)    
VALUES ("Can you please take out the trash", "don't forget to stop for gas");




INSERT INTO employee (userName, tasks, routines, messages)
VALUES ("John", "Cleese", 2, 1), ("Willy", "Wonka", 2, 1), ("Napoleon", "XIV", 5, 2), ("Witch", "Doctor", 4, 2), ("Raffi", "Sings", 5, 2), ("Crocodile", "Dundee", 7, 3), ("Crocky", "Chomper", 7, 3), ("Dude", "Snarfles", 9, 4), ("Moomoo", "LeGreat", 11, 5), ("Tweeter", "Bot", 13, 6), ("Frank", "Trollington", 14, 6)

