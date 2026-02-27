import React from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { CheckCircle, Package, Wallet, Sparkles } from "lucide-react";

export const OrderSuccessScreen: React.FC = () => {
  const { navigate, userPoints } = useApp();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-background">
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto px-4">
        {/* Confirmation */}
        <motion.div
          className="flex flex-col items-center pt-10 pb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full"
            style={{ width: 72, height: 72, background: "hsl(152 55% 35% / 0.1)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.15 }}
          >
            <CheckCircle size={36} strokeWidth={1.7} style={{ color: "hsl(var(--ledger-credit))" }} />
          </motion.div>
          <h1 className="font-bold mt-4" style={{ fontSize: 22, letterSpacing: "-0.02em" }}>Order Confirmed</h1>
          <p className="text-muted-foreground mt-1 text-center" style={{ fontSize: 14 }}>
            Your order has been placed successfully.
          </p>
        </motion.div>

        {/* Order info */}
        <div className="card-base p-4 mb-3">
          <div className="flex flex-col gap-3">
            {[
              ["Order number", "#RS-2024-88412"],
              ["Date placed", "Feb 18, 2026 · 9:41 AM"],
              ["Payment", "Visa •••• 4242"],
              ["Total charged", "$429.84"],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>{label}</span>
                <span className="font-semibold" style={{ fontSize: 13 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div className="card-base p-4 mb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, background: "hsl(var(--primary-light))" }}>
              <Package size={18} className="text-primary" strokeWidth={1.7} />
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: 14 }}>Estimated delivery</p>
              <p className="text-muted-foreground" style={{ fontSize: 13 }}>Feb 22–24, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-0">
            {["Placed", "Processing", "Shipped", "Delivered"].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-full"
                    style={{
                      width: 10, height: 10,
                      background: i <= 1 ? "hsl(var(--primary))" : "hsl(var(--border))",
                      border: i <= 1 ? "none" : "2px solid hsl(var(--border))",
                    }}
                  />
                  <span className="mt-1 text-center" style={{ fontSize: 9, color: i <= 1 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}>
                    {step}
                  </span>
                </div>
                {i < 3 && (
                  <div className="flex-1 h-px mb-3" style={{ background: i < 1 ? "hsl(var(--primary))" : "hsl(var(--border))" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Rewards credited */}
        <motion.div
          className="p-4 rounded-xl mb-3"
          style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted))" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles size={15} style={{ color: "hsl(var(--accent-dark))" }} />
            <p className="font-semibold" style={{ fontSize: 14 }}>Rewards credited</p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              ["Points added", "+340 pts", true],
              ["Contest entries", "+2 entries", true],
              ["New wallet balance", `${userPoints.toLocaleString()} pts`, false],
            ].map(([label, val, isGold]) => (
              <div key={label as string} className="flex justify-between">
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>{label as string}</span>
                <span
                  className="font-semibold"
                  style={{ fontSize: 13, color: isGold ? "hsl(var(--accent-dark))" : "hsl(var(--foreground))" }}
                >
                  {val as string}
                </span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-2.5" style={{ fontSize: 11 }}>
            Points will be credited within 24 hours of delivery confirmation.
          </p>
        </motion.div>

        {/* Items */}
        <div className="card-base p-3.5 mb-6">
          <p className="font-semibold mb-2.5" style={{ fontSize: 14 }}>Items ordered</p>
          {[
            { name: "Sony WH-1000XM5", price: "$279", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop" },
            { name: "Kindle Paperwhite (16 GB)", price: "$119", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=60&h=60&fit=crop" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <img src={item.image} alt={item.name} style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }} />
              <p className="font-medium flex-1" style={{ fontSize: 13 }}>{item.name}</p>
              <span className="font-semibold" style={{ fontSize: 13 }}>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="px-4 pb-8 pt-3 bg-card" style={{ borderTop: "1px solid hsl(var(--border))" }}>
        <motion.button
          className="btn-primary flex items-center justify-center gap-2 mb-2.5"
          onClick={() => navigate("wallet")}
          whileTap={{ scale: 0.97 }}
        >
          <Wallet size={16} /> View Wallet & Rewards
        </motion.button>
        <motion.button className="btn-secondary" onClick={() => navigate("home")} whileTap={{ scale: 0.97 }}>
          Continue Shopping
        </motion.button>
      </div>
    </div>
  );
};
