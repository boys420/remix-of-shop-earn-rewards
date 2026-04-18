import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { TrendingUp, TrendingDown, Award, ChevronRight, Gift } from "lucide-react";

const TRANSACTIONS = [
  { id: "t1", type: "credit" as const, label: "Order #GP-2026-88412", sub: "Sony WH-1000XM5 + Kindle", points: 199, date: "Feb 18, 2026", entries: 2 },
  { id: "t2", type: "credit" as const, label: "Order #GP-2026-88410", sub: "Nike Pegasus 40", points: 59, date: "Feb 16, 2026", entries: 1 },
  { id: "t3", type: "debit" as const, label: "Destiny Deal Entry — Smartwatch", sub: "Entered prize draw", points: -50, date: "Feb 15, 2026", entries: 0 },
  { id: "t4", type: "credit" as const, label: "Order #GP-2026-88387", sub: "Instant Pot Duo", points: 40, date: "Feb 12, 2026", entries: 1 },
  { id: "t5", type: "credit" as const, label: "Order #GP-2026-88301", sub: "Levi's 511 Jeans", points: 30, date: "Feb 08, 2026", entries: 1 },
  { id: "t6", type: "debit" as const, label: "Destiny Deal Entry — Earbuds", sub: "Entered prize draw", points: -60, date: "Feb 06, 2026", entries: 0 },
  { id: "t7", type: "credit" as const, label: "Order #GP-2026-88201", sub: "AirPods Pro 2nd gen", points: 100, date: "Feb 03, 2026", entries: 2 },
];

export const WalletScreen: React.FC = () => {
  const { userPoints, navigate } = useApp();
  const [tab, setTab] = useState<"points" | "entries">("points");
  const walletValue = (userPoints * 5).toLocaleString("en-IN");

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar mesh-plum" style={{ color: "white", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>9:41</span>
        <div className="flex items-center gap-1 text-xs" style={{ color: "white" }}>●●●</div>
      </div>

      {/* Balance header — mesh + ambient orbs */}
      <div className="relative px-4 pb-4 pt-2 mesh-plum overflow-hidden">
        <div className="orb" style={{ width: 200, height: 200, top: "-40%", right: "-20%", background: "hsl(38 70% 55%)", opacity: 0.3 }} />
        <div className="orb" style={{ width: 160, height: 160, bottom: "-50%", left: "-15%", background: "hsl(290 80% 55%)", opacity: 0.45, animationDelay: "1.2s" }} />

        <div className="relative">
          <p className="font-medium mb-1" style={{ color: "hsl(0 0% 100% / 0.55)", fontSize: 11, letterSpacing: "0.08em" }}>
            WALLET BALANCE
          </p>
          <div className="flex items-end gap-2">
            <AnimatedNumber
              value={userPoints}
              className="font-semibold"
              style={{ fontSize: 40, color: "white", letterSpacing: "-0.035em", lineHeight: 1 }}
            />
            <span className="mb-1 font-medium" style={{ color: "hsl(0 0% 100% / 0.55)", fontSize: 14 }}>pts</span>
          </div>
          <p style={{ color: "hsl(var(--accent))", fontSize: 13, fontWeight: 500, marginTop: 4 }}>
            ≈ ₹{walletValue} wallet value
          </p>

          {/* Quick stats */}
          <div className="flex gap-2.5 mt-4">
            {[
              { label: "This month", value: "+428 pts" },
              { label: "Redeemed", value: "350 pts" },
              { label: "Entries", value: "3 total" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex-1 rounded-lg p-2.5 text-center"
                style={{ background: "hsl(0 0% 100% / 0.1)", border: "1px solid hsl(0 0% 100% / 0.1)", backdropFilter: "blur(12px)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <p style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{stat.value}</p>
                <p style={{ color: "hsl(0 0% 100% / 0.5)", fontSize: 10 }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Action cards */}
      <div className="px-4 mt-3.5 flex gap-2.5">
        <motion.button
          className="flex-1 card-base p-3 flex items-center gap-2.5"
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.1 }}
          onClick={() => navigate("giveaways")}
        >
          <div className="flex items-center justify-center" style={{ width: 36, height: 36, background: "hsl(var(--accent-light))", borderRadius: "var(--radius-sm)" }}>
            <Gift size={16} style={{ color: "hsl(var(--accent-dark))" }} strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <p className="font-medium" style={{ fontSize: 13 }}>Destiny Deals</p>
            <p className="text-muted-foreground" style={{ fontSize: 11 }}>10 prizes</p>
          </div>
        </motion.button>
        <motion.button
          className="flex-1 card-base p-3 flex items-center gap-2.5"
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.1 }}
          onClick={() => navigate("my-entries")}
        >
          <div className="flex items-center justify-center" style={{ width: 36, height: 36, background: "hsl(var(--primary-light))", borderRadius: "var(--radius-sm)" }}>
            <Award size={16} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <p className="font-medium" style={{ fontSize: 13 }}>My Entries</p>
            <p className="text-muted-foreground" style={{ fontSize: 11 }}>4 entries</p>
          </div>
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-3.5 mb-3 p-1" style={{ background: "hsl(var(--muted))", borderRadius: "var(--radius)" }}>
        {(["points", "entries"] as const).map((t) => (
          <button
            key={t}
            className="flex-1 py-2 font-medium transition-all"
            style={{
              fontSize: 13,
              borderRadius: "calc(var(--radius) - 4px)",
              background: tab === t ? "hsl(var(--card))" : "transparent",
              color: tab === t ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
              boxShadow: tab === t ? "var(--shadow-card)" : "none",
            }}
            onClick={() => setTab(t)}
          >
            {t === "points" ? "Points Ledger" : "Destiny Entries"}
          </button>
        ))}
      </div>

      {/* Ledger */}
      <div className="flex-1 overflow-y-auto px-4" style={{ paddingBottom: 80 }}>
        {tab === "points" && (
          <div className="card-base px-4">
            {TRANSACTIONS.map((tx, i) => (
              <motion.div
                key={tx.id}
                className="ledger-row"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02, duration: 0.18 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      width: 32, height: 32,
                      borderRadius: "var(--radius-sm)",
                      background: tx.type === "credit" ? "hsl(158 42% 34% / 0.06)" : "hsl(var(--secondary-light))",
                    }}
                  >
                    {tx.type === "credit"
                      ? <TrendingUp size={14} strokeWidth={1.5} style={{ color: "hsl(var(--ledger-credit))" }} />
                      : <TrendingDown size={14} strokeWidth={1.5} style={{ color: "hsl(var(--ledger-debit))" }} />
                    }
                  </div>
                  <div>
                    <p className="font-medium" style={{ fontSize: 13 }}>{tx.label}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 11 }}>{tx.sub}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 11 }}>{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: 14,
                      color: tx.type === "credit" ? "hsl(var(--ledger-credit))" : "hsl(var(--ledger-debit))",
                    }}
                  >
                    {tx.type === "credit" ? "+" : ""}{tx.points} pts
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "entries" && (
          <div className="card-base px-4">
            {[
              { contest: "iPhone 15 Pro Destiny Deal", entries: 7, status: "Active", deadline: "Feb 24, 2026" },
              { contest: "Sony PS5 Bundle", entries: 3, status: "Active", deadline: "Mar 01, 2026" },
              { contest: "Dyson V15 Vacuum", entries: 2, status: "Active", deadline: "Feb 28, 2026" },
            ].map((item) => (
              <div key={item.contest} className="ledger-row">
                <div>
                  <p className="font-medium" style={{ fontSize: 13 }}>{item.contest}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 11 }}>Ends {item.deadline}</p>
                  <span
                    className="inline-block font-medium mt-0.5 px-2 py-0.5"
                    style={{ fontSize: 10, background: "hsl(var(--primary-light))", color: "hsl(var(--primary))", borderRadius: "var(--radius-sm)" }}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ fontSize: 18, color: "hsl(var(--primary))" }}>{item.entries}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 11 }}>entries</p>
                </div>
              </div>
            ))}
            <div className="py-3 text-center">
              <button
                className="text-primary font-medium flex items-center gap-1 mx-auto"
                style={{ fontSize: 13 }}
                onClick={() => navigate("contests")}
              >
                View all Destiny Deals <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
