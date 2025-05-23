export const view = async () => {
  try {
    console.log("➡️ Cerere GET către backend pentru produse");

    const response = await fetch('http://localhost:1000/view-products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();
    console.log("⬅️ Răspuns brut primit:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("❌ Eroare la parsarea JSON-ului:", parseErr);
      throw new Error("Răspuns invalid de la server.");
    }

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch products');
    }

    return data;

  } catch (error) {
    console.error("❌ Eroare în serviciul view:", error);
    throw new Error(error.message || 'Failed to fetch products');
  }
};
