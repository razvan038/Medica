const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "super-secret-jwt-key"; // pune-l în .env

const recovery = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({ message: 'Utilizatorul nu a fost gasit.' });
        }

        const token = jwt.sign(
            { email: existingUser.email }, // poți pune și `id` dacă vrei
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        const resetUrl = `http://localhost:3000/auth/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "0e2014512b007e",
                pass: "270ee30283271a"
            }
        });

        const mailOptions = {
            from: 'noreply@medica.ro',
            to: email,
            subject: 'Resetare parola',
            text: `Acceseaza urmatorul link pentru a reseta parola: ${resetUrl}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Eroare la trimiterea mailului." });
            }
            console.log('Email trimis:', info.response);
            res.status(200).json({ message: 'Email cu link de resetare trimis.' });
            return ({message:token})
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'A apărut o eroare la trimiterea mailului.' });
    }
};
 module.exports= {recovery};