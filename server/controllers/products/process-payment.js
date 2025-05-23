const sequelize = require('../auth/sequelize'); // conectarea la baza de date
const { QueryTypes } = require('sequelize');

/**
 * Ex: req.body = [
 *   { id: 'produs-uuid-1', quantity: 2 },
 *   { id: 'produs-uuid-2', quantity: 1 }
 * ]
 */
const processPayment = async (req, res) => {
  const cartItems = req.body;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: "Coșul este gol." });
  }

  const t = await sequelize.transaction();

  try {
    for (const item of cartItems) {
      const { id, quantity } = item;

      // Verificăm stocul
      const [product] = await sequelize.query(
        "SELECT stock FROM products WHERE id = ? FOR UPDATE",
        {
          replacements: [id],
          type: QueryTypes.SELECT,
          transaction: t
        }
      );

      if (!product) {
        throw new Error(`Produsul cu ID ${id} nu există.`);
      }

      if (product.stock < quantity) {
        throw new Error(`Stoc insuficient pentru produsul cu ID ${id}.`);
      }

      // Scădem stocul
      await sequelize.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        {
          replacements: [quantity, id],
          type: QueryTypes.UPDATE,
          transaction: t
        }
      );
    }

    await t.commit();
    return res.status(200).json({ message: "Plata procesată și stocul actualizat cu succes!" });

  } catch (err) {
    await t.rollback();
    console.error("Eroare la actualizarea stocului:", err.message);
    return res.status(500).json({ message: "Eroare la procesarea plății: " + err.message });
  }
};

module.exports = { processPayment };
