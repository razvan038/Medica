export const verifyOtp = async ({email, otp}) => {
    try {
        console.log("➡️ Trimit date către backend:", {
            email, otp
        });

        const response = await fetch('http://localhost:1000/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email, 
                otp 
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
            throw new Error(data.message || 'Failed to verify OTP');
        }

        return data;

    } catch (error) {
        console.error("❌ Eroare în serviciu verifyOtp:", error);
        throw new Error(error.message || 'Failed to verify OTP');
    }
}