const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = process.env.JWT_SECRET || "super-secret-jwt-key";

const resetPassword = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token lipsă sau invalid." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const { email } = decoded;

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({ message: "Utilizatorul nu a fost găsit." });
        }

        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Setezi noua parolă pe utilizatorul găsit
        existingUser.password = hashedPassword;

        // ✅ Salvezi modificările în DB
        await existingUser.save();

        return res.status(200).json({ message: "Parola a fost resetată cu succes." });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Token invalid sau expirat." });
    }
};

module.exports = { resetPassword };
