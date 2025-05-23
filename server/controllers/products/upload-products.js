const sequelize = require("../auth/sequelize"); // Calea către fișierul cu instanța Sequelize

const uploadProducts = async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Lista de produse este goală sau invalidă." });
    }

    const values = products.map(product => [
      product.id,
      product.name || "",
      product.description || "",
      product.category || "",
      product.price || 0,
      product.discount || 0,
      product.stock || 0,
    ]);

    const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?, ?)").join(", ");
    const flatValues = values.flat();

    const query = `
      INSERT INTO products 
        (id, name, description, category, price, discount, stock)
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        description = VALUES(description),
        category = VALUES(category),
        price = VALUES(price),
        discount = VALUES(discount),
        stock = VALUES(stock)
    `;

    await sequelize.query(query, { replacements: flatValues });

    res.status(200).json({ message: "Produsele au fost încărcate cu succes." });
  } catch (error) {
    console.error("Eroare la încărcarea produselor:", error);
    res.status(500).json({ message: "Eroare internă." });
  }
};

module.exports = { uploadProducts };
