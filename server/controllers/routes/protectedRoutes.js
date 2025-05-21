const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

router.get('/profile', isAuthenticated, (req, res) => {
  res.json({
    message: 'Profil utilizator',
    user: {
      id: req.user.userId,
      email: req.user.email,
    },
  });
});

module.exports = router;
