"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token inexistent. Autentifică-te mai întâi.");
        return;
      }

      try {
        const res = await fetch("http://localhost:1000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Eroare la obținerea profilului");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>Se încarcă profilul...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-semibold mb-2">Profil utilizator</h1>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
