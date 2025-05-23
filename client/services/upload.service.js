export const upload = async (products) => {
  try {
    console.log("➡️ Trimit array de produse către backend:", products);

    const response = await fetch('http://localhost:1000/upload-products', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(products), // array de produse
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
        throw new Error(data.message || 'Failed to upload');
    }

    return data;

  } catch (error) {
    console.error("❌ Eroare în serviciu upload:", error);
    throw new Error(error.message || 'Failed to upload');
  }
};
