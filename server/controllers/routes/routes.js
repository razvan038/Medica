const router = require('express').Router();
const { register } = require('../auth/register');
const { verifyOTP } = require('../auth/otp');
const { loginUser } = require('../auth/login'); 
const { logoutUser } = require('../auth/logout');

router.get('/api/hello', (req, res) => {
    console.log('Received GET on /api/hello');
    let result = {
        message: 'Hello world!'
    };
    res.status(200).json(result);
});
// Endpoint pentru înregistrare
router.post('/register', register);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.delete('/logout', logoutUser);

module.exports = router;    