import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Award, ChevronRight, Gift } from "lucide-react";

const TRANSACTIONS = [
  { id: "t1", type: "credit" as const, label: "Order #RS-2024-88412", sub: "Sony WH-1000XM5 + Kindle", points: 199, date: "Feb 18, 2026", entries: 2 },
  { id: "t2", type: "credit" as const, label: "Order #RS-2024-88410", sub: "Nike Pegasus 40", points: 59, date: "Feb 16, 2026", entries: 1 },
  { id: "t3", type: "debit" as const, label: "Giveaway Entry — Smartwatch", sub: "Entered giveaway draw", points: -50, date: "Feb 15, 2026", entries: 0 },
  { id: "t4", type: "credit" as const, label: "Order #RS-2024-88387", sub: "Instant Pot Duo", points: 40, date: "Feb 12, 2026", entries: 1 },
  { id: "t5", type: "credit" as const, label: "Order #RS-2024-88301", sub: "Levi's 511 Jeans", points: 30, date: "Feb 08, 2026", entries: 1 },
  { id: "t6", type: "debit" as const, label: "Giveaway Entry — Earbuds", sub: "Entered giveaway draw", points: -60, date: "Feb 06, 2026", entries: 0 },
  { id: "t7", type: "credit" as const, label: "Order #RS-2024-88201", sub: "AirPods Pro 2nd gen", points: 100, date: "Feb 03, 2026", entries: 2 },
];

export const WalletScreen: React.FC = () => {
  const { userPoints, navigate } = useApp();
  const [tab, setTab] = useState<"points" | "entries">("points");
  const walletValue = (userPoints * 0.01).toFixed(2);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar" style={{ background: "hsl(var(--primary-dark))", color: "white" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>9:41</span>
        <div className="flex items-center gap-1 text-xs" style={{ color: "white" }}>●●●</div>
      </div>

      {/* Balance header */}
      <div className="px-4 pb-5 pt-2" style={{ background: "hsl(var(--primary-dark))" }}>
        <p className="font-medium mb-1" style={{ color: "hsl(0 0% 100% / 0.55)", fontSize: 12, letterSpacing: "0.04em" }}>
          WALLET BALANCE
        </p>
        <div className="flex items-end gap-2">
          <motion.span
            className="font-bold"
            style={{ fontSize: 40, color: "white", letterSpacing: "-0.03em" }}
            key={userPoints}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {userPoints.toLocaleString()}
          </motion.span>
          <span className="mb-2 font-medium" style={{ color: "hsl(0 0% 100% / 0.55)", fontSize: 15 }}>pts</span>
        </div>
        <p style={{ color: "hsl(var(--accent))", fontSize: 14, fontWeight: 600 }}>
          ≈ ${walletValue} wallet value
        </p>

        {/* Quick stats */}
        <div className="flex gap-3 mt-4">
          {[
            { label: "This month", value: "+428 pts" },
            { label: "Redeemed", value: "350 pts" },
            { label: "Giveaway entries", value: "3 total" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex-1 rounded-xl p-2.5 text-center"
              style={{ background: "hsl(0 0% 100% / 0.08)" }}
            >
              <p style={{ color: "white", fontSize: 13, fontWeight: 700 }}>{stat.value}</p>
              <p style={{ color: "hsl(0 0% 100% / 0.5)", fontSize: 10 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action cards */}
      <div className="px-4 mt-3 flex gap-3">
        <motion.button
          className="flex-1 card-base p-3.5 flex items-center gap-3"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("giveaways")}
        >
          <div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, background: "hsl(var(--accent-light))" }}>
            <Gift size={17} style={{ color: "hsl(var(--accent-dark))" }} strokeWidth={1.7} />
          </div>
          <div className="text-left">
            <p className="font-semibold" style={{ fontSize: 13 }}>Giveaways</p>
            <p className="text-muted-foreground" style={{ fontSize: 11 }}>10 prizes</p>
          </div>
        </motion.button>
        <motion.button
          className="flex-1 card-base p-3.5 flex items-center gap-3"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("my-entries")}
        >
          <div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, background: "hsl(var(--primary-light))" }}>
            <Award size={17} className="text-primary" strokeWidth={1.7} />
          </div>
          <div className="text-left">
            <p className="font-semibold" style={{ fontSize: 13 }}>My Entries</p>
            <p className="text-muted-foreground" style={{ fontSize: 11 }}>4 entries</p>
          </div>
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-3 mb-3 rounded-xl p-1" style={{ background: "hsl(var(--muted))" }}>
        {(["points", "entries"] as const).map((t) => (
          <button
            key={t}
            className="flex-1 rounded-lg py-2 font-semibold transition-colors"
            style={{
              fontSize: 13,
              background: tab === t ? "hsl(var(--card))" : "transparent",
              color: tab === t ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
              boxShadow: tab === t ? "var(--shadow-card)" : "none",
            }}
            onClick={() => setTab(t)}
          >
            {t === "points" ? "Points Ledger" : "Contest Entries"}
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
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                    style={{
                      width: 32, height: 32,
                      background: tx.type === "credit" ? "hsl(152 55% 35% / 0.08)" : "hsl(var(--secondary-light))",
                    }}
                  >
                    {tx.type === "credit"
                      ? <TrendingUp size={15} strokeWidth={1.7} style={{ color: "hsl(var(--ledger-credit))" }} />
                      : <TrendingDown size={15} strokeWidth={1.7} style={{ color: "hsl(var(--ledger-debit))" }} />
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
                      fontSize: 15,
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
              { contest: "iPhone 15 Pro Giveaway", entries: 7, status: "Active", deadline: "Feb 24, 2026" },
              { contest: "Sony PS5 Bundle", entries: 3, status: "Active", deadline: "Mar 01, 2026" },
              { contest: "Dyson V15 Vacuum", entries: 2, status: "Active", deadline: "Feb 28, 2026" },
            ].map((item) => (
              <div key={item.contest} className="ledger-row">
                <div>
                  <p className="font-medium" style={{ fontSize: 13 }}>{item.contest}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 11 }}>Ends {item.deadline}</p>
                  <span
                    className="inline-block rounded-full font-medium mt-0.5 px-2 py-0.5"
                    style={{ fontSize: 10, background: "hsl(var(--primary-light))", color: "hsl(var(--primary))" }}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ fontSize: 20, color: "hsl(var(--primary))" }}>{item.entries}</p>
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
                View all contests <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
