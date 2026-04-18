import React from "react";
import { useApp } from "@/context/AppContext";
import { ChevronLeft, Award, Clock, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const ENTRIES = [
  { id: "e1", prize: "Wireless Earbuds", points: 60, date: "Feb 20, 2026", status: "active" as const, value: "₹14,999" },
  { id: "e2", prize: "Smartwatch", points: 50, date: "Feb 18, 2026", status: "active" as const, value: "₹20,499" },
  { id: "e3", prize: "Bluetooth Speaker", points: 75, date: "Feb 10, 2026", status: "won" as const, value: "₹24,999" },
  { id: "e4", prize: "Smartphone", points: 200, date: "Jan 28, 2026", status: "not-won" as const, value: "₹74,999" },
];

const STATUS_CONFIG = {
  active: { label: "Active", color: "hsl(var(--primary))", bg: "hsl(var(--primary-light))", icon: Clock },
  won: { label: "Won", color: "hsl(var(--ledger-credit))", bg: "hsl(158 42% 34% / 0.06)", icon: CheckCircle },
  "not-won": { label: "Not Selected", color: "hsl(var(--muted-foreground))", bg: "hsl(var(--muted))", icon: XCircle },
};

export const MyEntriesScreen: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-card" style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="screen-header">
        <motion.button onClick={() => navigate("wallet")} whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
          <ChevronLeft size={21} strokeWidth={1.5} />
        </motion.button>
        <h1>My Entries</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3" style={{ paddingBottom: 80 }}>
        {ENTRIES.map((entry, i) => {
          const config = STATUS_CONFIG[entry.status];
          const Icon = config.icon;

          return (
            <motion.div
              key={entry.id}
              className="card-base p-4 mb-2.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.18 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award size={15} style={{ color: "hsl(var(--accent-dark))" }} />
                  <h3 className="font-medium" style={{ fontSize: 14 }}>{entry.prize}</h3>
                </div>
                <span
                  className="flex items-center gap-1 px-2 py-0.5 font-medium"
                  style={{ fontSize: 11, color: config.color, background: config.bg, borderRadius: "var(--radius-sm)" }}
                >
                  <Icon size={11} />
                  {config.label}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground" style={{ fontSize: 12 }}>
                <span>Value: {entry.value}</span>
                <span>{entry.points} pts used</span>
              </div>
              <p className="text-muted-foreground mt-1" style={{ fontSize: 11 }}>Entered {entry.date}</p>

              {entry.status === "won" && (
                <motion.div
                  className="mt-3 p-2.5 flex items-center gap-2"
                  style={{ background: "hsl(158 42% 34% / 0.06)", border: "1px solid hsl(158 42% 34% / 0.1)", borderRadius: "var(--radius-sm)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle size={14} style={{ color: "hsl(var(--ledger-credit))" }} />
                  <span className="font-medium" style={{ fontSize: 12, color: "hsl(var(--ledger-credit))" }}>
                    Congratulations! Prize will be delivered within 14 days.
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
