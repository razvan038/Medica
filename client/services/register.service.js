export const registerUser = async ({ username, email, password, confirmPassword }) => {
    try {
        console.log("➡️ Trimit date către backend:", {
            username, email, password, confirmPassword
        });

        const response = await fetch('http://localhost:1000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username, 
                email, 
                password, 
                confirmPassword 
            }),
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
            throw new Error(data.message || 'Failed to register');
        }

        return data;

    } catch (error) {
        console.error("❌ Eroare în serviciu registerUser:", error);
        throw new Error(error.message || 'Failed to register');
    }
};
