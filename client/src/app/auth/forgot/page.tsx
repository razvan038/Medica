"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sendRecoveryEmail } from "../../../../services/recovery.service"; // Adjust the import path as necessary

function Page() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const data = await sendRecoveryEmail(email);
            console.log("Recovery email sent", data);
            // Optionally redirect or show a success message
        } catch (err) {
            setError("Failed to send recovery email. Please check your email.");
        } finally {
            setIsLoading(false);
        }
    }

return (
    <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
            <CardTitle>Forgot Password?</CardTitle>
            <CardDescription>Enter your email to receive a password reset link.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleResetPassword}>
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
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </form>
        </CardContent>
        <CardFooter>
            <Button type="submit" disabled={isLoading} className={cn(isLoading && "loading")}>
                {isLoading ? "Sending..." : "Send Recovery Email"}
            </Button>
        </CardFooter>
    </Card>
)
}
export default Page;