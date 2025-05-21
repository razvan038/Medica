export const sendRecoveryEmail = async (email) => {
    try {
        await fetch("/api/reset-password", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}` // token primit din URL
    },
    body: JSON.stringify({ password })
    });


        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (parseErr) {
            console.error("Eroare la parsarea JSON-ului:", parseErr);
            throw new Error("Raspuns invalid de la server");
        }
        if (!response.ok) {
            throw new Error(data.message || "Failed to send recovery email");
        }
        return data;
    } catch (error) {
        console.error("Eroare in serviciul sendRecoveryEmail", error);
        throw new Error(error.message || "Failed to send recovery email");
    }
}