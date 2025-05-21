const router = require('express').Router();
const { register } = require('../auth/register');
const { verifyOTP } = require('../auth/otp');
const { loginUser } = require('../auth/login'); 
const { logoutUser } = require('../auth/logout');
const protectedRoutes = require('./protectedRoutes');
const isAuthenticated = require('../middleware/isAuthenticated');
const { recovery } = require('../auth/recovery');
const { getAllUsers, deleteUser } = require('../users/userController') 
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
router.delete('/logout', isAuthenticated, logoutUser);
router.use('/api', protectedRoutes); 

// Users endpoints
router.get('/viewUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser);

// Password recovery
router.post('/recovery', recovery);             // trimite email de resetare
router.post('/reset-password', resetPassword);  // resetează parola 

module.exports = router;
