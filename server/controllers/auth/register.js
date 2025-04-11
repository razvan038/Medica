const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        // Extrage informațiile din corpul cererii
        const { username, password } = req.body;

        // Verifică dacă utilizatorul există deja în baza de date
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilizatorul există deja.' });
        }

        // Criptează parola utilizatorului
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creează un nou utilizator în baza de date
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Răspunde cu succes
        res.status(201).json({ message: 'Utilizator înregistrat cu succes.' });
    } catch (error) {
        // Răspunde cu eroare în caz de eșec
        res.status(500).json({ message: 'A apărut o eroare la înregistrare.' });
    }
};

module.exports = register;