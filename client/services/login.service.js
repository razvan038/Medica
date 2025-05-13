export const loginUser = async (email, password) => {
    try {
        console.log("--> Trimit date catre backend:", {
            email, password
        });
        const response = await fetch('http://localhost:1000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });
        const text = await response.text();
        console.log("Raspuns brut primit:", text);

        let data;
        try{
            data=JSON.parse(text);
        }catch (parseErr){
            console.error("Eroare la parsarea JSON-ului:", parseErr);
            throw new Error("Raspuns invalid de la server");
        }
        if(!response.ok){
            throw new Error(data.message || "Failed to login");
        }
        return data;

    }catch(error) {
        console.error("Eroare in serviciul loginUser", error);
        throw new Error(error.message || "Failed to login");
    }
};