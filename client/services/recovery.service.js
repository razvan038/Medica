export const sendRecoveryEmail = async (email) => {
    try {
       const response = await fetch("http://localhost:1000/recovery", {
        method: "POST",
        headers: {
        "Content-Type": "application/json", 
    },
    body: JSON.stringify({ email })
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