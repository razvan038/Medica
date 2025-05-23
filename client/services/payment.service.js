// services/payment.service.js

export const processPayment = async (cartItems) => {
  try {
    const response = await fetch("http://localhost:1000/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Eroare la procesarea plății.");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "A apărut o eroare necunoscută.");
  }
};
