const jwt = require('jsonwebtoken');
const User = require('../models/User');

const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token lipsă sau invalid.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Caută userul în baza de date
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
    }

    // Ștergem tokenul salvat
    user.token = null;
    await user.save();

    return res.status(200).json({ message: 'Logout reușit.' });
  } catch (error) {
    console.error('Eroare la logout:', error);
    return res.status(500).json({ message: 'Eroare internă la logout.' });
  }
};

module.exports = { logoutUser };
