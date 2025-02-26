"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User, Package } from "lucide-react";

const AdminDashboard = ({ user }: { user: { fName: string; lName: string } }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6 p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Hello  👋🏻
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the admin panel. Manage users and products with ease.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 cursor-pointer hover:shadow-lg transition" onClick={() => router.push("/admin/users") }>
          <CardHeader>
            <User className="w-10 h-10 text-blue-500" />
            <CardTitle className="text-xl mt-2">Manage Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">View, edit, and manage platform users.</p>
          </CardContent>
        </Card>

        <Card className="p-6 cursor-pointer hover:shadow-lg transition" onClick={() => router.push("/admin/products") }>
          <CardHeader>
            <Package className="w-10 h-10 text-green-500" />
            <CardTitle className="text-xl mt-2">Manage Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Add, update, or remove products.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
