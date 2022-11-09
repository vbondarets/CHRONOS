CREATE DATABASE chronos;
CREATE USER 'idashchenk'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON chronos.* TO 'idashchenk'@'localhost';

use chronos;
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(75) NOT NULL,
    full_name VARCHAR(255) NOT NULL UNIQUE,
    photo VARCHAR(256) DEFAULT 'avatar/avatar.png',
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS calendar (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author_id INT,
    title VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS event (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author_id INT,
    title VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(256) NOT NULL,
    type ENUM('arrangement', 'reminder', 'task'),
    color VARCHAR(20),
    calendar_id INT,
    time TIMESTAMP,
    FOREIGN KEY (calendar_id) REFERENCES calendar(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE if NOT EXISTS event_users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    calendar_id INT,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
    FOREIGN KEY (calendar_id) REFERENCES calendar(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) on DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS calendar_users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    calendar_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) on DELETE CASCADE,
    FOREIGN KEY (calendar_id) REFERENCES calendar(id) ON DELETE CASCADE
);


