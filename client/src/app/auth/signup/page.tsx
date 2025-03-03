"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye } from "lucide-react";
import { TransitionLink } from "@/components/home/TransitionLink";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Importă componentele Dialog
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"; // OTP components

function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false); // Stare pentru a controla deschiderea dialogului OTP
  
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  // Handler pentru crearea contului
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Aici poți adăuga validarea pentru formular, dacă este necesar
    // După ce se apasă butonul de creere cont, se deschide dialogul OTP
    setShowOTPDialog(true);
  };

  return (
    <>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>Enter your details to create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAccount}> {/* Aici adăugăm handler-ul pe formular */}
            <div className="grid w-full items-center gap-4">
              <div>
                <Label>Personal data</Label>
                <div className="flex flex-row space-x-1.5">
                  <Input placeholder="Insert your first name" required />
                  <Input placeholder="Insert your last name" required />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Insert your email" required />
              </div>
              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder=""
                    className="pr-10"
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
              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <div className="relative">
                  <Input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirm-password"
                    placeholder=""
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {confirmPasswordVisible ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-2 items-center mt-4">
              <TransitionLink
                className="text-xs underline hover:text-neutral-700"
                href="/auth/login"
              >
                Already have an account?
              </TransitionLink>
              <Button type="submit">Create account</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Dialogul OTP */}
      <Dialog open={showOTPDialog} onOpenChange={(open) => setShowOTPDialog(open)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>OTP Verification</DialogTitle>
            <DialogDescription>Enter the OTP sent to your email</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center mt-4">
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
            <div className="flex flex-row space-x-3 mt-2">
              <Button variant="outline" onClick={() => setShowOTPDialog(false)}>
                Cancel
              </Button>
              <Button>Submit OTP</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Page;
