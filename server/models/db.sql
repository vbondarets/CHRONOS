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
