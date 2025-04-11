const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Conectare la DB

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificarea existentei utilizatorului
        const user = await User.findOne({ where: { username } });

        if (!user) {
            // User not found
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Invalid password
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        // Return the token
        res.json({ token });
    } catch (error) {
        // Handle the error here
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};