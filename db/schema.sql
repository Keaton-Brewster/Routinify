DROP DATABASE IF EXISTS the_whiteboard

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
    FOREIGN KEY (many tasks, or routines)
);
CREATE TABLE routines (
    id INTEGER AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    routine VARCHAR NOT NULL
);
CREATE TABLE messages (
    id INTEGER AUTO_INCREMENT NOT NULL,
    body TEXT NOT NULL,
    isRead BOOLEAN NOT NULL,
)
