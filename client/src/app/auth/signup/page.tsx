"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { registerUser } from "../../../../services/register.service";
import {verifyOtp} from '../../../../services/otp.service'

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser({ username, email, password, confirmPassword });
      // Înregistrare reușită -> arătăm OTP dialog
      setShowOTPDialog(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare necunoscută.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setOtpError(""); // resetăm eroarea
    try {
      await verifyOtp({ email, otp });
      setShowOTPDialog(false);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setOtpError(err.message);
      } else {
        setOtpError("OTP invalid sau eroare necunoscută.");
      }
    }
  };
  

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Crează un cont</CardTitle>
        <CardDescription>Introdu datele tale pentru a crea un cont nou.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
              <Label htmlFor="password">Parola</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmă parola</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? "Înregistrare..." : "Crează cont"}
            </Button>
          </div>
        </form>
      </CardContent>

      {/* Dialog OTP */}
      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Verificare OTP</DialogTitle>
            <DialogDescription>Introdu codul primit pe email</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          {otpError && <div className="text-red-600 mt-2">{otpError}</div>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOTPDialog(false)}>Renunță</Button>
            <Button onClick={handleOtpSubmit}>Trimite OTP</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SignupPage;
