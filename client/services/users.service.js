export async function getAllUsers() {
    const res = await fetch("http://localhost:1000/viewUsers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        
    });
    const data = await res.json();
    
    if(!res.ok){
        throw new Error (data.message || "A aparut o eroare");
    }
    return data;
}

export async function deleteUser(id) {
    const res = await fetch(`http://localhost:1000/deleteUser/${id}`, {
        method: "DELETE",
    });
        const data = await res.json();
        if (!res.ok){
            throw new Error(data.message || "A aparut o eroare la functia de stergere");
        }
        return data;
}