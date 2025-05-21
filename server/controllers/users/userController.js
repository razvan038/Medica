const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['otp', 'createdAt', 'updatedAt', 'password', 'resetToken', 'resetTokenExpires'] }
    });

    res.status(200).json(users);
  } catch (err) {
    console.error("Eroare la preluarea utilizatorilor:", err);
    res.status(500).json({ message: "Eroare internă." });
  }
};

const deleteUser = async (req,res) => {
  try{
    const { id } = req.params;

    const user = await User.findByPk(id);
    if(!user) {
      return res.status(404).json({message: "Utilizatorul nu a fost gasit"})
    }
    await user.destroy();

    return res.status(200).json({message: "Utilizatorul a fost sters!"});
  } catch (err) {
    console.error("Eroare la stergea utilizatorului", err);
    return res.status(500).json({message: "Eroare interna"});
  }
};

module.exports = { getAllUsers, deleteUser };
