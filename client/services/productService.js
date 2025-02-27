// client/src/services/productService.js

const API_URL = "http://localhost:8080/api";  // URL-ul backend-ului tău

// Funcție pentru obținerea listei de produse
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;  // Returnează lista de produse
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Funcție pentru adăugarea unui produs
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const data = await response.json();
    return data;  // Returnează produsul adăugat
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Funcție pentru editarea unui produs
export const editProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to edit product");
    }

    const data = await response.json();
    return data;  // Returnează produsul actualizat
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

// Funcție pentru ștergerea unui produs
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    const data = await response.json();
    return data;  // Returnează un mesaj de succes sau status
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
