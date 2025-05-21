const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Căutăm utilizatorul în baza de date
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
        }

        // Verificăm parola
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Parolă incorectă.' });
        }

        // Dacă OTP-ul nu este verificat, trimitem un nou OTP
        if (!user.otpVerified) {
            const otp = crypto.randomInt(100000, 999999);
            user.otp = otp;
            await user.save();

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
                subject: 'Reverificare OTP',
                text: `Codul tău OTP pentru confirmarea contului este: ${otp}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Eroare trimitere OTP:', error);
                } else {
                    console.log('OTP retrimis la email:', info.response);
                }
            });

            return res.status(403).json({ message: 'Contul nu este verificat. Am retrimis OTP-ul pe email.' });
        }

        // Dacă OTP-ul este verificat, generăm JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Autentificare reușită.',
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare internă la autentificare.' });
    }
};

module.exports = { loginUser };
