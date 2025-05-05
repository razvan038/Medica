"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const VerifyOtpPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerifyOtp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/auth/login");
      } else {
        setError(data.message || "OTP incorect.");
      }
    } catch (error) {
      setError("A apărut o eroare la conectarea cu serverul.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Verifică OTP</CardTitle>
        <CardDescription>Introdu codul OTP primit pe email pentru a finaliza înregistrarea.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerifyOtp}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="otp">Cod OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? "Verificare..." : "Verifică OTP"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyOtpPage;
