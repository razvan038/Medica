const User = require('../models/User');

// Funcție pentru verificarea OTP-ului
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Căutăm utilizatorul în baza de date
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Utilizatorul nu a fost găsit.' });
        }

        // Verificăm dacă OTP-ul este corect
        if (user.otp === parseInt(otp)) {
            // OTP corect, putem marca utilizatorul ca verificat sau orice altceva
            user.otpVerified = true;
            await user.save();
            res.status(200).json({ message: 'OTP verificat cu succes!' });
        } else {
            res.status(400).json({ message: 'OTP incorect.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'A apărut o eroare la verificarea OTP.' });
    }
};

module.exports = { verifyOTP };