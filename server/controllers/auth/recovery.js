const crypto = require('crypto');
const User = require('../models/User');
const { createTransporter } = require('../email/email');

const recovery = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Emailul este necesar." });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
        }

        // Generează token și expirare
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 oră de valabilitate

        // Salvează token și expirare în DB
        existingUser.resetToken = token;
        existingUser.resetTokenExpires = expires;
        await existingUser.save();

        // Construiește URL de reset
        const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

        const transporter = createTransporter();

        // Email-ul de trimitere
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@medica.ro',
            to: email,
            subject: 'Resetare parolă',
            text: `Salut,\n\nAccesează acest link pentru a-ți reseta parola:\n${resetUrl}\n\nLinkul expiră în 1 oră.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Email cu link de resetare trimis.' });
        } catch (error) {
            console.error("Eroare la trimiterea emailului:", error);
            return res.status(500).json({ message: "Eroare la trimiterea emailului." });
        }

    } catch (error) {
        console.error("Eroare în funcția de recovery:", error);
        return res.status(500).json({ message: 'Eroare internă.' });
    }
};

module.exports = { recovery };
