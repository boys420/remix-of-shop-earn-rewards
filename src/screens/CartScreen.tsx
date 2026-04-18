import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { ChevronLeft, Minus, Plus, Trash2, Sparkles } from "lucide-react";

interface CartItem {
  id: string; name: string; brand: string; price: number; qty: number; points: number; image: string; variant: string;
}

const INITIAL_CART: CartItem[] = [
  { id: "c1", name: "Sony WH-1000XM5", brand: "Sony", price: 23999, qty: 1, points: 139, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", variant: "Black" },
  { id: "c2", name: "Kindle Paperwhite (16 GB)", brand: "Amazon", price: 9999, qty: 1, points: 60, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop", variant: "Black" },
];

export const CartScreen: React.FC = () => {
  const { navigate } = useApp();
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, qty: it.qty + delta } : it).filter((it) => it.qty > 0));
  };

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const totalPoints = items.reduce((s, it) => s + it.points * it.qty, 0);
  const FREE_SHIP_THRESHOLD = 15000;
  const shipping = subtotal > FREE_SHIP_THRESHOLD ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;
  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-card" style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="screen-header">
        <motion.button onClick={() => navigate("product-list")} whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
          <ChevronLeft size={21} strokeWidth={1.5} />
        </motion.button>
        <h1 className="flex-1">
          Cart <span className="text-muted-foreground font-normal" style={{ fontSize: 14 }}>({items.length})</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 100 }}>
        <div className="px-4 pt-3 flex flex-col gap-2.5">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground" style={{ fontSize: 14 }}>Your cart is empty</p>
              <button className="mt-4 text-primary font-medium" style={{ fontSize: 14 }} onClick={() => navigate("product-list")}>Browse products</button>
            </div>
          )}
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="card-base p-3 flex gap-3"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.18 }}
            >
              <img src={item.image} alt={item.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
              <div className="flex-1 min-w-0">
                <p className="text-muted-foreground" style={{ fontSize: 10 }}>{item.brand}</p>
                <p className="font-medium leading-tight" style={{ fontSize: 13 }}>{item.name}</p>
                <p className="text-muted-foreground" style={{ fontSize: 11 }}>Colour: {item.variant}</p>
                <div className="reward-badge mt-1"><Sparkles size={9} /> +{item.points * item.qty} pts</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <motion.button
                      className="flex items-center justify-center border bg-muted"
                      style={{ width: 28, height: 28, borderColor: "hsl(var(--border))", borderRadius: "var(--radius-sm)" }}
                      onClick={() => updateQty(item.id, -1)}
                      whileTap={{ scale: 0.85 }}
                      transition={{ duration: 0.08 }}
                    >
                      {item.qty === 1 ? <Trash2 size={12} style={{ color: "hsl(var(--secondary))" }} /> : <Minus size={12} />}
                    </motion.button>
                    <span className="font-semibold" style={{ fontSize: 14 }}>{item.qty}</span>
                    <motion.button
                      className="flex items-center justify-center border bg-muted"
                      style={{ width: 28, height: 28, borderColor: "hsl(var(--border))", borderRadius: "var(--radius-sm)" }}
                      onClick={() => updateQty(item.id, 1)}
                      whileTap={{ scale: 0.85 }}
                      transition={{ duration: 0.08 }}
                    >
                      <Plus size={12} />
                    </motion.button>
                  </div>
                  <span className="font-semibold" style={{ fontSize: 15 }}>{fmt(item.price * item.qty)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {shipping > 0 && items.length > 0 && (
          <div className="mx-4 mt-3 p-3" style={{ background: "hsl(var(--primary-light))", borderRadius: "var(--radius)" }}>
            <p style={{ fontSize: 13 }}>Add <strong>{fmt(FREE_SHIP_THRESHOLD - subtotal)}</strong> more for free shipping</p>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--primary-muted))" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)}%`, background: "hsl(var(--primary))" }} />
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="mx-4 mt-3 p-3 flex items-center gap-3" style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted) / 0.7)", borderRadius: "var(--radius)" }}>
            <Sparkles size={15} style={{ color: "hsl(var(--accent-dark))" }} />
            <div>
              <p className="font-medium" style={{ fontSize: 13 }}>
                You'll earn <span style={{ color: "hsl(var(--accent-dark))" }}>+{totalPoints} points</span> on this order
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 11 }}>
                ≈ {fmt(totalPoints * 5)} wallet value · {Math.ceil(totalPoints / 50)} Destiny Deal entries
              </p>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="mx-4 mt-3 card-base p-4">
            <h3 className="font-semibold mb-3" style={{ fontSize: 14 }}>Order Summary</h3>
            <div className="flex flex-col gap-2.5">
              {[["Subtotal", fmt(subtotal)], ["Shipping", shipping === 0 ? "Free" : fmt(shipping)], ["GST (18%)", fmt(tax)]].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground" style={{ fontSize: 13 }}>{label}</span>
                  <span style={{ fontSize: 13, color: val === "Free" ? "hsl(var(--ledger-credit))" : undefined, fontWeight: val === "Free" ? 600 : 400 }}>{val}</span>
                </div>
              ))}
              <div className="pt-2.5 flex justify-between" style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
                <span className="font-semibold" style={{ fontSize: 14 }}>Total</span>
                <span className="font-semibold" style={{ fontSize: 14 }}>{fmt(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="sticky-cta">
          <motion.button className="btn-primary" onClick={() => navigate("checkout")} whileTap={{ scale: 0.98 }}>
            Proceed to Checkout — {fmt(total)}
          </motion.button>
        </div>
      )}
    </div>
  );
};
