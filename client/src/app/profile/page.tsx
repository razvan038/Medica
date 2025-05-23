// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";

type User = {
  email: string;
  username?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:1000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="text-center mt-8">Se încarcă...</div>;
  if (!user) return <div className="text-center mt-8">Nu ești autentificat.</div>;

  return (
  <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
    <h1 className="text-2xl font-bold mb-4">Profilul tău</h1>
    {user ? (
      <>
        <p><strong>Email:</strong> {user.email}</p>
        {user.username && <p><strong>Username:</strong> {user.username}</p>}
      </>
    ) : (
      <p>Nu ești autentificat.</p>
    )}
  </div>
);

}
