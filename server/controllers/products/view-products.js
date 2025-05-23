const sequelize = require("../auth/sequelize");

const viewProducts = async (req, res) => {
  try {
    const [products] = await sequelize.query("SELECT * FROM products");

    res.status(200).json(products);
  } catch (error) {
    console.error("Eroare la preluarea produselor:", error);
    res.status(500).json({ message: "Eroare internă." });
  }
};

module.exports = { viewProducts };
