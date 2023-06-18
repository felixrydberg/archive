TODO:
-Admin tools for tables
-Ships
-Badges
-Ranks
-Display badges
-Display ranks
-Apply ranks + badge admin tool

Before Publication:
-Change Cors -

SQL:
DROP DATABASE IF EXISTS ragnarok;

CREATE DATABASE IF NOT EXISTS ragnarok;

use ragnarok;

CREATE TABLE users(
userID int AUTO_INCREMENT PRIMARY KEY,
name varchar(50) NOT NULL,
mail varchar(50) NOT NULL,
pwd varchar(128) NOT NULL,
org boolean DEFAULT false,
admin boolean DEFAULT false
);

INSERT INTO users(name , mail, pwd, org, admin) VALUES('Felix','felixryd@gmail.com','$2b$10$rFM4JyQ.AVQOWMltOi7ihu/e0tEI3wdBziDhJQAP2vcKiHt3iIX9O',1,1);

CREATE TABLE ships(
shipID int NOT NULL PRIMARY KEY,
manufacturer varchar(64) NOT NULL,
name varchar(64) NOT NULL,
career varchar(64) NOT NULL,
focus varchar(64),
class varchar(64),
size varchar(64)
);

CREATE TABLE linkships(
linkID int PRIMARY KEY AUTO_INCREMENT,
userID int NOT NULL,
shipID int NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID),
FOREIGN KEY (shipID) REFERENCES ships(shipID)
);

CREATE TABLE badges(
badgeID int AUTO_INCREMENT PRIMARY KEY,
badgename varchar(50) NOT NULL,
badgetype varchar(50) NOT NULL
);

CREATE TABLE linkbadges(
linkID int AUTO_INCREMENT PRIMARY KEY,
userID int NOT NULL,
badgeID int NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID),
FOREIGN KEY (badgeID) REFERENCES badges(badgeID)
);

CREATE TABLE ranks(
rankID int PRIMARY KEY AUTO_INCREMENT,
name varchar(50) NOT NULL,
rank int NOT NULL
);

CREATE TABLE linkranks(
linkID int AUTO_INCREMENT PRIMARY KEY,
userID int NOT NULL,
rankID int NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID),
FOREIGN KEY (rankID) REFERENCES ranks(rankID)
);

DROP PROCEDURE IF EXISTS update_ships;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS update_ships()
BEGIN

    DELETE FROM ships;

END$$
