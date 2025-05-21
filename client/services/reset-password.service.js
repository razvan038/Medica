export async function resetPassword({ password, confirmPassword, token }) {
    const res = await fetch("http://localhost:1000/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, confirmPassword, token }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message || "A apărut o eroare");
    }
  
    return data;
  }
  