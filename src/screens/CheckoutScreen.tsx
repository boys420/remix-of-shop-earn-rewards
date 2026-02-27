import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, CreditCard, Check, Sparkles } from "lucide-react";

const ADDRESSES = [
  { id: "a1", label: "Home", line1: "142 West 83rd Street", line2: "New York, NY 10024", default: true },
  { id: "a2", label: "Office", line1: "1 World Trade Center", line2: "New York, NY 10007", default: false },
];

const PAYMENT_METHODS = [
  { id: "pm1", type: "Visa", last4: "4242", expires: "08/27", icon: "💳" },
  { id: "pm2", type: "Apple Pay", last4: "", expires: "", icon: "⬛" },
];

export const CheckoutScreen: React.FC = () => {
  const { navigate, placeOrder } = useApp();
  const [selectedAddr, setSelectedAddr] = useState("a1");
  const [selectedPM, setSelectedPM] = useState("pm1");

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-card" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 bg-card" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <motion.button onClick={() => navigate("cart")} whileTap={{ scale: 0.9 }}>
          <ChevronLeft size={22} strokeWidth={1.7} />
        </motion.button>
        <h1 className="font-bold" style={{ fontSize: 18 }}>Checkout</h1>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 120 }}>
        {/* Steps */}
        <div className="flex items-center px-4 py-3 gap-2 bg-muted" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          {["Address", "Payment", "Review"].map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center justify-center rounded-full font-semibold"
                  style={{ width: 20, height: 20, background: i < 2 ? "hsl(var(--primary))" : "hsl(var(--muted))", color: i < 2 ? "white" : "hsl(var(--muted-foreground))", fontSize: 11 }}
                >
                  {i < 1 ? <Check size={11} /> : i + 1}
                </div>
                <span style={{ fontSize: 12, fontWeight: i < 2 ? 600 : 400, color: i < 2 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>{step}</span>
              </div>
              {i < 2 && <div className="flex-1 h-px" style={{ background: "hsl(var(--border))" }} />}
            </React.Fragment>
          ))}
        </div>

        <div className="px-4 pt-4 flex flex-col gap-4">
          {/* Address */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-semibold" style={{ fontSize: 15 }}>Delivery Address</h2>
              <button className="text-primary font-medium" style={{ fontSize: 13 }}>Add new</button>
            </div>
            {ADDRESSES.map((addr) => (
              <motion.button
                key={addr.id}
                className="card-base p-3.5 flex items-start gap-3 text-left w-full mb-2"
                style={{ border: selectedAddr === addr.id ? "1.5px solid hsl(var(--primary))" : "1.5px solid transparent" }}
                onClick={() => setSelectedAddr(addr.id)}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                  style={{ width: 34, height: 34, background: selectedAddr === addr.id ? "hsl(var(--primary-light))" : "hsl(var(--muted))" }}>
                  <MapPin size={15} strokeWidth={1.7} className={selectedAddr === addr.id ? "text-primary" : "text-muted-foreground"} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold" style={{ fontSize: 13 }}>{addr.label}</span>
                    {addr.default && <span className="rounded-full px-2 py-0.5" style={{ fontSize: 10, background: "hsl(var(--primary-light))", color: "hsl(var(--primary))" }}>Default</span>}
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
          <div className="p-3 rounded-xl flex items-center justify-between" style={{ background: "hsl(var(--primary-light))" }}>
            <div>
              <p className="font-semibold" style={{ fontSize: 13 }}>Standard Delivery</p>
              <p className="text-muted-foreground" style={{ fontSize: 12 }}>Estimated: Feb 22–24, 2026</p>
            </div>
            <span className="font-semibold" style={{ fontSize: 14, color: "hsl(var(--ledger-credit))" }}>Free</span>
          </div>

          {/* Payment */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-semibold" style={{ fontSize: 15 }}>Payment Method</h2>
              <button className="text-primary font-medium" style={{ fontSize: 13 }}>Add card</button>
            </div>
            {PAYMENT_METHODS.map((pm) => (
              <motion.button
                key={pm.id}
                className="card-base p-3.5 flex items-center gap-3 w-full mb-2"
                style={{ border: selectedPM === pm.id ? "1.5px solid hsl(var(--primary))" : "1.5px solid transparent" }}
                onClick={() => setSelectedPM(pm.id)}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ width: 34, height: 34, background: "hsl(var(--muted))", fontSize: 18 }}>{pm.icon}</div>
                <div className="flex-1 text-left">
                  <p className="font-semibold" style={{ fontSize: 13 }}>{pm.type}</p>
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
            <h2 className="font-semibold mb-3" style={{ fontSize: 15 }}>Order Summary</h2>
            {[["2 items", "$398.00"], ["Shipping", "Free"], ["Tax (8%)", "$31.84"]].map(([l, v]) => (
              <div key={l} className="flex justify-between mb-2">
                <span className="text-muted-foreground" style={{ fontSize: 14 }}>{l}</span>
                <span style={{ fontSize: 14, color: v === "Free" ? "hsl(var(--ledger-credit))" : undefined, fontWeight: v === "Free" ? 600 : 400 }}>{v}</span>
              </div>
            ))}
            <div className="pt-2.5 flex justify-between" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              <span className="font-bold" style={{ fontSize: 15 }}>Total</span>
              <span className="font-bold" style={{ fontSize: 15 }}>$429.84</span>
            </div>
          </div>

          {/* Rewards */}
          <div className="p-3.5 rounded-xl" style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted))" }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} style={{ color: "hsl(var(--accent-dark))" }} />
              <p className="font-semibold" style={{ fontSize: 13 }}>Rewards on this order</p>
            </div>
            {[["Points earned", "+199 pts"], ["Contest entries", "+1 entry"], ["Wallet value", "≈ $1.99"]].map(([l, v]) => (
              <div key={l} className="flex justify-between mb-1.5">
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>{l}</span>
                <span className="font-semibold" style={{ fontSize: 13, color: "hsl(var(--accent-dark))" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-card" style={{ borderTop: "1px solid hsl(var(--border))" }}>
        <motion.button className="btn-primary" onClick={placeOrder} whileTap={{ scale: 0.97 }}>
          Place Order — $429.84
        </motion.button>
        <p className="text-center text-muted-foreground mt-2" style={{ fontSize: 11 }}>
          By placing this order you agree to our Terms of Sale
        </p>
      </div>
    </div>
  );
};
