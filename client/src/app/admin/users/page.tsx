"use client";

import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../../../services/users.service";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
  role_id: number;
  otpVerified: boolean;
  createdAt: string;
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message || "Eroare la preluarea utilizatorilor");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Sigur vrei să ștergi acest utilizator?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setMessage("Utilizatorul a fost șters cu succes.");
    } catch (err) {
      setError((err as Error).message || "Eroare la ștergere");
    }
  };

  return (
    <Card className="max-w-6xl mx-auto mt-10 p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Administrare utilizatori</h1>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin mr-2" />
          Se încarcă utilizatorii...
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      ) : (
        <>
          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {message}
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>OTP Verificat</TableHead>
                <TableHead>Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role_id === 1 ? "Admin" : "Utilizator"}
                  </TableCell>
                  <TableCell>{user.otpVerified ? "✔️" : "❌"}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Șterge
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Card>
  );
}
