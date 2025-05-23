"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { processPayment } from "../../../services/payment.service";

const CheckoutPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handlePayment = async () => {
    if (
      paymentMethod === "card" &&
      (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)
    ) {
      alert("Completează toate câmpurile cardului.");
      return;
    }

    setLoading(true);
    try {
      await processPayment(cart);
      alert("Plata efectuată cu succes!");
      localStorage.removeItem("cart");
      router.push("/");
    } catch (err: any) {
      alert("Eroare la plată: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sumar Comandă</h1>

      {cart.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x {item.price} RON
                </p>
              </div>
              <p className="font-semibold">
                {(item.quantity * item.price).toFixed(2)} RON
              </p>
            </div>
          ))}

          <div className="text-right font-semibold text-lg">
            Total: {totalPrice.toFixed(2)} RON
          </div>

          {/* Selectare metodă plată */}
          <div className="space-y-2">
            <label className="block font-medium">Metodă de plată:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            >
              <option value="card">Card</option>
              <option value="cash">Ramburs</option>
            </select>
          </div>

          {/* Detalii card */}
          {paymentMethod === "card" && (
            <div className="space-y-2 mt-4">
              <input
                type="text"
                placeholder="Nume pe card"
                value={cardDetails.name}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, name: e.target.value })
                }
                className="border px-3 py-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Număr card"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                className="border px-3 py-2 rounded-md w-full"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Expirare (MM/YY)"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  className="border px-3 py-2 rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  className="border px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
          )}

          <Button onClick={handlePayment} disabled={loading} className="mt-6">
            {loading ? "Se procesează..." : "Efectuează Plata"}
          </Button>
        </div>
      )}
    </main>
  );
};

export default CheckoutPage;
