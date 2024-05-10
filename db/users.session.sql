-- Active: 1695390096638@@localhost@3306@coordeesdc

USE coordeesdc;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL,
);

ALTER TABLE users ADD userroles ENUM("Admin", "Users") NOT NULL;

INSERT INTO
    users (
        username, email, password, userroles
    )
VALUES (
        'john_doe', 'john@example.com', 'password123', "User"
    );

INSERT INTO
    users (
        username, email, password, userroles
    )
VALUES (
        'thanz', 'thanz@example.com', 'password123', "Admin"
    );

SELECT * FROM users

UPDATE users SET userroles = "Users"

UPDATE users SET id = 2 WHERE id = 4

INSERT INTO
    users (
        username, email, password, userroles
    )
VALUES (
        'thanz2', 'thanz2@example.com', 'password123', 'users'
    )

USE mysql;

SET @new_password = SHA2('password123', 256);

UPDATE users SET password = @new_password WHERE username = 'thanz2';

SELECT * FROM technicians