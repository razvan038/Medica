"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "../../../../services/reset-password.service";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Tokenul lipsește din URL.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc.");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({ password, confirmPassword, token });
      setSuccess("Parola a fost resetată cu succes.");
      setPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center">Resetare parolă</h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

      <div className="mb-4">
        <Label htmlFor="password" className="mb-1 block font-medium">Parola nouă</Label>
        <Input
          id="password"
          type="password"
          placeholder="Parola nouă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="confirmPassword" className="mb-1 block font-medium">Confirmă parola</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirmă parola"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <Button disabled={isLoading} className="w-full" type="submit">
        {isLoading ? "Se încarcă..." : "Resetează parola"}
      </Button>
    </form>
  );
}
