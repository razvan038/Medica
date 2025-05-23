"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleCheckout = () => {
  router.push("/checkout");
  };

  const updateCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDecrease = (id: string) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const handleIncrease = (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    updateCart(updatedCart);
  };

  const handleRemove = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Coșul tău</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Coșul este gol.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border-b pb-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price} RON / buc.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => handleDecrease(item.id)}>
                      -
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => handleIncrease(item.id)}>
                      +
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(item.id)}
                    >
                      Șterge
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)} RON
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold">Total: {total.toFixed(2)} RON</p>
            <Button variant="default" onClick={handleCheckout}>
              Finalizează comanda
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
