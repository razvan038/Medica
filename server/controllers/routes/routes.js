const router = require('express').Router();
const { register } = require('../auth/register');
const { verifyOTP } = require('../auth/otp');

router.get('/api/hello', (req, res) => {
    console.log('Received GET on /api/hello');
    let result = {
        message: 'Hello world!'
    };
    res.status(200).json(result);
});
// Endpoint pentru înregistrare
router.post('/register', register);
router.post('/verify-otp', verifyOTP);

module.exports = router;