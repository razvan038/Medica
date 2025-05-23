const mysql = require("mysql2/promise"); // Importăm direct varianta promise

const setupDB = async () => {
    try {
        // Creăm conexiunea fără să mai aplicăm .promise()
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            multipleStatements: true,
        });

        // Verificăm dacă baza de date există
        const [dbExists] = await connection.query(
            `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'Medica'`
        );

        if (dbExists.length === 0) {
            console.log("Baza de date nu există. Se creează...");
            await connection.query(`CREATE DATABASE Medica`);
            console.log("Baza de date a fost creată!");
        } else {
            console.log("Baza de date deja există.");
        }

        // Folosim baza de date
        await connection.query("USE Medica");

        // Creăm tabelele
        const createTablesSQL = `
        CREATE TABLE IF NOT EXISTS roles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS permissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS role_permissions (
            role_id INT,
            permission_id INT,
            PRIMARY KEY (role_id, permission_id),
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
            FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role_id INT,
            otp VARCHAR(100),
            otpVerified BOOLEAN DEFAULT FALSE,
            resetToken VARCHAR(255),
            resetTokenExpires DATETIME,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS products (
            id VARCHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            category VARCHAR(100),
            price DECIMAL(10, 2) NOT NULL,
            discount DECIMAL(10, 2),
            stock INT NOT NULL
        );
        `;

        await connection.query(createTablesSQL);
        console.log("Tabelele au fost create/verificate!");

        // Populăm tabelele doar dacă sunt goale
        await connection.query(
            `INSERT IGNORE INTO roles (id, name) VALUES 
            (1, 'admin'), (2, 'user')`
        );

        await connection.query(
            `INSERT IGNORE INTO permissions (id, name) VALUES 
            (1, 'add_users'), (2, 'add_products'), (3, 'edit_products'), 
            (4, 'delete_products'), (5, 'delete_users'), (6, 'edit_credentials')`
        );

        await connection.query(
            `INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES 
            (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), 
            (2, 6)`
        );

        console.log("RBAC populat cu succes!");

        // Închidem conexiunea
        await connection.end();
    } catch (err) {
        console.error("Eroare la configurarea bazei de date:", err);
    }
};

// Pornim scriptul
setupDB();
