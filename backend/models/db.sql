CREATE database Chronos;
CREATE USER 'vbondarets' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON Chronos.* TO 'vbondarets';

use Chronos;

CREATE TABLE IF NOT EXISTS user(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(52) NOT NULL,
    login VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(36) NOT NULL UNIQUE,
    password VARCHAR(72) NOT NULL,
    profileImg VARCHAR(72) DEFAULT 'default.png'
);

