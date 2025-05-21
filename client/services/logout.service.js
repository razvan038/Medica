export const logoutUser = async () => {
    try {
        // Opțional: Trimite cererea de logout la server pentru a valida că utilizatorul este autentificat
        const response = await fetch('http://localhost:1000/logout', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Sau sessionStorage
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Logout eșuat');
        }

        // Dacă logout-ul este reușit, șterge token-ul
        localStorage.removeItem('token');  // Sau sessionStorage.removeItem('token');
        console.log('Logout reușit');
    } catch (error) {
        console.error('Eroare la logout:', error);
    }
};
