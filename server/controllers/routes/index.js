const router = require('express').Router();

router.get('/api/hello', (req, res) => {
    console.log('Received GET on /api/hello');
    let result = {
        message: 'Hello world!'
    };
    res.status(200).json(result);
})

module.exports = router;