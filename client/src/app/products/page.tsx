"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { view } from "../../../services/view.service";
import { Button } from "@/components/ui/button";

export default function ViewProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter(); 

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await view();
      setProducts(data);

      // Recuperăm coșul din localStorage dacă există
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err: any) {
      setError(err.message || "Eroare la încărcarea produselor.");
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);

const handleAddToCart = (product: any) => {
  setCart((prev) => {
    const exists = prev.find((p) => p.id === product.id);
    const updatedCart = exists
      ? prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      : [...prev, { ...product, quantity: 1 }];
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });
};

const handleCashout = () => {
  router.push("/cart");
};

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8">Produse</h1>

      {loading && <p>Se încarcă...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-medium">{product.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">
                {product.description}
              </p>
              <p className="font-semibold">{product.price} RON</p>
              <p className="text-xs text-gray-500">Stock: {product.stock}</p>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleAddToCart(product)}
              className="mt-4"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <section className="fixed bottom-6 right-6 w-72 bg-white border rounded-md shadow-md p-4 flex flex-col">
          <h3 className="font-semibold mb-4">Coșul tău ({cart.reduce((acc, i) => acc + i.quantity, 0)})</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="truncate">{item.name}</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" onClick={handleCashout}>
            To Cart
          </Button>
        </section>
      )}
    </main>
  );
}
