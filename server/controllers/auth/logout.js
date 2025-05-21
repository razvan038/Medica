const logoutUser = (req, res) => {
  // Verificăm dacă utilizatorul este autentificat
  if (!req.user) {
      return res.status(401).json({ message: 'Utilizatorul nu este autentificat.' });
  }

  // Răspuns de succes pentru logout
  res.status(200).json({ message: 'Logout reușit. Te rugăm să ștergi token-ul pe client.' });
};

module.exports = { logoutUser };
