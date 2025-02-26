"use client"
import React, { useState } from 'react';
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
import {
  Button
} from "@/components/ui/button";
import { EyeClosed, Eye } from 'lucide-react';
import {TransitionLink} from '@/components/home/TransitionLink'

function Page() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);
    
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>Enter your credentials to login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div>
                <Label>
                  Personal data
                </Label>
                <div className='flex flex-row space-x-1.5'>
                  <Input placeholder="Insert your first name" />
                  <Input placeholder="Insert your last name" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Insert your email" />
              </div>
              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder=""
                    className="pr-10"
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <div className='flex flex-row space-x-2 items-center'>
            <TransitionLink className='text-xs underline hover:text-neutral-700' href="/auth/login">Already have an account?</TransitionLink>
            <Button>Create account</Button>
          </div>
        </CardFooter>
      </Card>
    );
}

export default Page;
