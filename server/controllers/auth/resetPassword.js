const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize'); // Asigură-te că ești în Sequelize

const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (!password || !confirmPassword || !token) {
            return res.status(400).json({ message: "Parola, confirmarea și tokenul sunt necesare." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Parolele nu se potrivesc." });
        }

        // Căutăm utilizatorul cu token valid și neexpirat
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpires: {
                    [Op.gt]: new Date() 
                }
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Token invalid sau expirat." });
        }

        // Hash noua parolă
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;

        await user.save();

        return res.status(200).json({ message: "Parola a fost resetată cu succes." });

    } catch (err) {
        console.error("Eroare la resetarea parolei:", err);
        return res.status(500).json({ message: "Eroare internă la resetarea parolei." });
    }
};

module.exports = { resetPassword };
