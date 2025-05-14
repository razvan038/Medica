const router = require('express').Router();
const { register } = require('../auth/register');
const { verifyOTP } = require('../auth/otp');
const { loginUser } = require('../auth/login'); 
const { logoutUser } = require('../auth/logout');
const { recovery } = require('../auth/recovery');
const { resetPassword } = require('../auth/resetPassword'); // nou: fișier cu logica resetării

// Test endpoint
router.get('/api/hello', (req, res) => {
    console.log('Received GET on /api/hello');
    res.status(200).json({ message: 'Hello world!' });
});

// Auth endpoints
router.post('/register', register);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.delete('/logout', logoutUser);

// Password recovery
router.post('/recovery', recovery);             // trimite email cu token JWT
router.post('/reset-password', resetPassword);  // resetează parola pe baza JWT-ului din header

module.exports = router;
