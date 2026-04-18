import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, CreditCard, Check, Sparkles } from "lucide-react";

const ADDRESSES = [
  { id: "a1", label: "Home", line1: "B-402, Lodha Park, Lower Parel", line2: "Mumbai, MH 400013", default: true },
  { id: "a2", label: "Office", line1: "BKC One, Bandra Kurla Complex", line2: "Mumbai, MH 400051", default: false },
];

const PAYMENT_METHODS = [
  { id: "pm1", type: "HDFC Visa", last4: "4242", expires: "08/27", icon: "💳" },
  { id: "pm2", type: "UPI / GPay", last4: "", expires: "", icon: "📱" },
];

export const CheckoutScreen: React.FC = () => {
  const { navigate, placeOrder } = useApp();
  const [selectedAddr, setSelectedAddr] = useState("a1");
  const [selectedPM, setSelectedPM] = useState("pm1");

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-card" style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="screen-header">
        <motion.button onClick={() => navigate("cart")} whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
          <ChevronLeft size={21} strokeWidth={1.5} />
        </motion.button>
        <h1>Checkout</h1>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 110 }}>
        {/* Steps */}
        <div className="flex items-center px-4 py-3 gap-2 bg-muted" style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
          {["Address", "Payment", "Review"].map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center justify-center rounded-full font-medium"
                  style={{ width: 20, height: 20, background: i < 2 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.2)", color: i < 2 ? "white" : "hsl(var(--muted-foreground))", fontSize: 11 }}
                >
                  {i < 1 ? <Check size={11} /> : i + 1}
                </div>
                <span style={{ fontSize: 12, fontWeight: i < 2 ? 500 : 400, color: i < 2 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>{step}</span>
              </div>
              {i < 2 && <div className="flex-1 h-px" style={{ background: "hsl(var(--border))" }} />}
            </React.Fragment>
          ))}
        </div>

        <div className="px-4 pt-4 flex flex-col gap-4">
          {/* Address */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-semibold" style={{ fontSize: 14 }}>Delivery Address</h2>
              <button className="text-primary font-medium" style={{ fontSize: 13 }}>Add new</button>
            </div>
            {ADDRESSES.map((addr) => (
              <motion.button
                key={addr.id}
                className="card-base p-3.5 flex items-start gap-3 text-left w-full mb-2"
                style={{ border: selectedAddr === addr.id ? "1.5px solid hsl(var(--primary))" : "1px solid hsl(var(--border) / 0.7)" }}
                onClick={() => setSelectedAddr(addr.id)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ width: 34, height: 34, background: selectedAddr === addr.id ? "hsl(var(--primary-light))" : "hsl(var(--muted))", borderRadius: "var(--radius-sm)" }}>
                  <MapPin size={14} strokeWidth={1.5} className={selectedAddr === addr.id ? "text-primary" : "text-muted-foreground"} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium" style={{ fontSize: 13 }}>{addr.label}</span>
                    {addr.default && <span className="px-1.5 py-0.5" style={{ fontSize: 10, background: "hsl(var(--primary-light))", color: "hsl(var(--primary))", borderRadius: "var(--radius-sm)" }}>Default</span>}
                  </div>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: 12 }}>{addr.line1}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 12 }}>{addr.line2}</p>
                </div>
                <div className="flex items-center justify-center rounded-full border-2 flex-shrink-0 mt-0.5"
                  style={{ width: 18, height: 18, borderColor: selectedAddr === addr.id ? "hsl(var(--primary))" : "hsl(var(--border))", background: selectedAddr === addr.id ? "hsl(var(--primary))" : "transparent" }}>
                  {selectedAddr === addr.id && <div className="rounded-full bg-white" style={{ width: 6, height: 6 }} />}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Delivery */}
          <div className="p-3 flex items-center justify-between" style={{ background: "hsl(var(--primary-light))", borderRadius: "var(--radius)" }}>
            <div>
              <p className="font-medium" style={{ fontSize: 13 }}>Standard Delivery</p>
              <p className="text-muted-foreground" style={{ fontSize: 12 }}>Estimated: Feb 22–24, 2026</p>
            </div>
            <span className="font-medium" style={{ fontSize: 13, color: "hsl(var(--ledger-credit))" }}>Free</span>
          </div>

          {/* Payment */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-semibold" style={{ fontSize: 14 }}>Payment Method</h2>
              <button className="text-primary font-medium" style={{ fontSize: 13 }}>Add card</button>
            </div>
            {PAYMENT_METHODS.map((pm) => (
              <motion.button
                key={pm.id}
                className="card-base p-3.5 flex items-center gap-3 w-full mb-2"
                style={{ border: selectedPM === pm.id ? "1.5px solid hsl(var(--primary))" : "1px solid hsl(var(--border) / 0.7)" }}
                onClick={() => setSelectedPM(pm.id)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 34, height: 34, background: "hsl(var(--muted))", fontSize: 16, borderRadius: "var(--radius-sm)" }}>{pm.icon}</div>
                <div className="flex-1 text-left">
                  <p className="font-medium" style={{ fontSize: 13 }}>{pm.type}</p>
                  {pm.last4 && <p className="text-muted-foreground" style={{ fontSize: 12 }}>•••• {pm.last4} · Expires {pm.expires}</p>}
                </div>
                <div className="flex items-center justify-center rounded-full border-2"
                  style={{ width: 18, height: 18, borderColor: selectedPM === pm.id ? "hsl(var(--primary))" : "hsl(var(--border))", background: selectedPM === pm.id ? "hsl(var(--primary))" : "transparent" }}>
                  {selectedPM === pm.id && <div className="rounded-full bg-white" style={{ width: 6, height: 6 }} />}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Order summary */}
          <div className="card-base p-4">
            <h2 className="font-semibold mb-3" style={{ fontSize: 14 }}>Order Summary</h2>
            {[["2 items", "₹33,998"], ["Shipping", "Free"], ["GST (18%)", "₹6,120"]].map(([l, v]) => (
              <div key={l} className="flex justify-between mb-2">
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>{l}</span>
                <span style={{ fontSize: 13, color: v === "Free" ? "hsl(var(--ledger-credit))" : undefined, fontWeight: v === "Free" ? 600 : 400 }}>{v}</span>
              </div>
            ))}
            <div className="pt-2.5 flex justify-between" style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
              <span className="font-semibold" style={{ fontSize: 14 }}>Total</span>
              <span className="font-semibold" style={{ fontSize: 14 }}>₹40,118</span>
            </div>
          </div>

          {/* Rewards */}
          <div className="p-3.5" style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted) / 0.7)", borderRadius: "var(--radius)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} style={{ color: "hsl(var(--accent-dark))" }} />
              <p className="font-medium" style={{ fontSize: 13 }}>Rewards on this order</p>
            </div>
            {[["Points earned", "+199 pts"], ["Destiny Deal entries", "+1 entry"], ["Wallet value", "≈ ₹995"]].map(([l, v]) => (
              <div key={l} className="flex justify-between mb-1.5">
                <span className="text-muted-foreground" style={{ fontSize: 12 }}>{l}</span>
                <span className="font-medium" style={{ fontSize: 12, color: "hsl(var(--accent-dark))" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sticky-cta">
        <motion.button className="btn-primary" onClick={placeOrder} whileTap={{ scale: 0.98 }}>
          Place Order — ₹40,118
        </motion.button>
        <p className="text-center text-muted-foreground mt-2" style={{ fontSize: 11 }}>
          By placing this order you agree to our Terms of Sale
        </p>
      </div>
    </div>
  );
};
