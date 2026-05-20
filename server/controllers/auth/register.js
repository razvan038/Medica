const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto'); // pentru generarea OTP-ului
const { createTransporter } = require('../email/email'); // Gmail SMTP transport

// Funcție pentru înregistrarea utilizatorului
const register = async (req, res) => {
    try {
        // Extrage informațiile din corpul cererii
        const { username, email, password, confirmPassword } = req.body;

        // Verifică dacă utilizatorul există deja în baza de date
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilizatorul există deja.' });
        }

        // Validare parole
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Parolele nu se potrivesc.' });
        }

        // Criptează parola utilizatorului
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creează un nou utilizator în baza de date
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Generează un OTP random de 6 caractere
        const otp = crypto.randomInt(100000, 999999); // un OTP între 100000 și 999999

        // Salvăm OTP-ul în baza de date sau într-o variabilă temporară pentru validare ulterioară
        newUser.otp = otp;
        await newUser.save();

        // Trimite OTP-ul pe email
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@medica.ro',
            to: email,
            subject: 'Verificare OTP',
            text: `Codul tău OTP pentru confirmarea contului este: ${otp}`,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('OTP trimis la emailul utilizatorului:', info.response);
        } catch (error) {
            console.error('Eroare la trimiterea emailului:', error);
            return res.status(500).json({ message: 'Eroare la trimiterea emailului.' });
        }

        // Răspunde cu succes
        res.status(201).json({ message: 'Utilizator înregistrat cu succes. Te rugăm să verifici email-ul pentru OTP.' });
    } catch (error) {
        // Răspunde cu eroare în caz de eșec
        console.error(error);
        res.status(500).json({ message: 'A apărut o eroare la înregistrare.' });
    }
};

module.exports = { register };
