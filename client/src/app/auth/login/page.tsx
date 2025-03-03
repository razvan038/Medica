"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye } from "lucide-react";
import { TransitionLink } from "@/components/home/TransitionLink";
import { cn } from "@/lib/utils";
import { login } from "../../../../services/authService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"; // Importă componenta OTP

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false); // Controlăm deschiderea dialogului OTP

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await login(email, password); // Trimite cererea de login
      // După login, deschidem dialogul OTP
      setShowOTPDialog(true);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Enter your credentials to login to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Insert your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Insert your password"
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>} {/* Afișează mesajul de eroare */}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.location.href = "/"}>Cancel</Button>
        <div className="flex flex-row space-x-2 items-center">
          <TransitionLink className={cn("text-underline text-s")} href="/auth/signup">Don't have an account?</TransitionLink>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </CardFooter>

      {/* Dialogul OTP */}
      <Dialog open={showOTPDialog} onOpenChange={(open) => setShowOTPDialog(open)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>OTP Verification</DialogTitle>
            <DialogDescription>Enter the OTP sent to your email</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <InputOTP maxLength={6}>
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
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOTPDialog(false)}>
              Cancel
            </Button>
            <Button>Submit OTP</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default Page;
