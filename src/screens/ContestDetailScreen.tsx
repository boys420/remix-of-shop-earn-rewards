import React from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, Users, ShoppingBag, Info } from "lucide-react";

const ENTRY_HISTORY = [
  { orderId: "#RS-2024-88410", date: "Feb 16, 2026", amount: "$284", entries: 3 },
  { orderId: "#RS-2024-88387", date: "Feb 12, 2026", amount: "$119", entries: 2 },
  { orderId: "#RS-2024-88301", date: "Feb 08, 2026", amount: "$79", entries: 2 },
];

export const ContestDetailScreen: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar" style={{ background: "hsl(var(--primary-dark))", color: "white" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>9:41</span>
        <div className="flex items-center gap-1 text-xs" style={{ color: "white" }}>●●●</div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "hsl(var(--primary-dark))" }}>
        <motion.button onClick={() => navigate("contests")} whileTap={{ scale: 0.9 }}>
          <ChevronLeft size={22} strokeWidth={1.7} style={{ color: "white" }} />
        </motion.button>
        <h1 className="font-bold flex-1" style={{ fontSize: 17, color: "white" }}>Contest Details</h1>
        <span className="rounded-full font-semibold px-2.5 py-1" style={{ background: "hsl(0 0% 100% / 0.15)", color: "white", fontSize: 11 }}>
          Active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 20 }}>
        {/* Prize banner */}
        <div className="px-4 py-5" style={{ background: "hsl(var(--primary-dark))" }}>
          <p className="font-medium mb-1" style={{ color: "hsl(0 0% 100% / 0.6)", fontSize: 12, letterSpacing: "0.04em" }}>PRIZE</p>
          <h2 className="font-bold leading-tight" style={{ fontSize: 22, color: "white", letterSpacing: "-0.02em" }}>
            iPhone 15 Pro 256GB
          </h2>
          <p className="font-bold mt-1" style={{ color: "hsl(var(--accent))", fontSize: 20 }}>$1,199 value</p>
        </div>

        <div className="px-4 pt-4 flex flex-col gap-4">
          {/* Timeline */}
          <div className="card-base p-4">
            <h3 className="font-semibold mb-3" style={{ fontSize: 14 }}>Timeline</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Contest opened", date: "Feb 01, 2026", done: true },
                { label: "Entry period closes", date: "Feb 24, 2026 · 11:59 PM", done: false },
                { label: "Winner selected", date: "Feb 25, 2026", done: false },
                { label: "Prize delivery", date: "Within 14 business days", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="rounded-full flex-shrink-0"
                      style={{
                        width: 10, height: 10, marginTop: 3,
                        background: item.done ? "hsl(var(--primary))" : "hsl(var(--border))",
                        border: item.done ? "none" : "2px solid hsl(var(--border))",
                      }}
                    />
                    {i < 3 && <div className="w-px mt-1" style={{ height: 20, background: "hsl(var(--border))" }} />}
                  </div>
                  <div>
                    <p className="font-medium" style={{ fontSize: 13 }}>{item.label}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 12 }}>{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card-base p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Users size={14} strokeWidth={1.7} className="text-muted-foreground" />
                <p className="text-muted-foreground" style={{ fontSize: 12 }}>Total entries</p>
              </div>
              <p className="font-bold" style={{ fontSize: 22, letterSpacing: "-0.02em" }}>4,821</p>
            </div>
            <div className="card-base p-3.5" style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted))" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <Award size={14} style={{ color: "hsl(var(--accent-dark))" }} />
                <p className="text-muted-foreground" style={{ fontSize: 12 }}>Your entries</p>
              </div>
              <p className="font-bold" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "hsl(var(--accent-dark))" }}>7</p>
            </div>
          </div>

          {/* Entry requirement */}
          <div className="card-base p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info size={15} strokeWidth={1.7} className="text-primary" />
              <h3 className="font-semibold" style={{ fontSize: 14 }}>Entry requirement</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 13 }}>
              Complete any purchase of <strong>$50 or more</strong> during the contest period to earn entries.
            </p>
            <div className="mt-3 rounded-lg p-3" style={{ background: "hsl(var(--muted))" }}>
              {[["$50–$99", "1 entry"], ["$100–$199", "2 entries"], ["$200+", "3 entries"]].map(([range, entry]) => (
                <div key={range} className="flex justify-between mb-1 last:mb-0">
                  <span className="text-muted-foreground" style={{ fontSize: 12 }}>{range}</span>
                  <span className="font-semibold" style={{ fontSize: 12 }}>{entry}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Entry history */}
          <div className="card-base p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag size={15} strokeWidth={1.7} className="text-primary" />
              <h3 className="font-semibold" style={{ fontSize: 14 }}>Your entry history</h3>
            </div>
            {ENTRY_HISTORY.map((entry) => (
              <div key={entry.orderId} className="ledger-row">
                <div>
                  <p className="font-medium" style={{ fontSize: 13 }}>{entry.orderId}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 12 }}>{entry.date} · {entry.amount}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold" style={{ fontSize: 14, color: "hsl(var(--primary))" }}>+{entry.entries}</span>
                  <p className="text-muted-foreground" style={{ fontSize: 11 }}>entries</p>
                </div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div className="card-base p-4 mb-4">
            <h3 className="font-semibold mb-2.5" style={{ fontSize: 14 }}>Official Rules</h3>
            {[
              "Open to legal US residents 18+",
              "Purchases must be completed before the entry deadline",
              "Returns void associated contest entries",
              "One winner selected randomly from all valid entries",
              "No purchase necessary to request contest rules",
            ].map((rule, i) => (
              <div key={i} className="flex gap-2 mb-1.5">
                <span className="text-muted-foreground font-mono flex-shrink-0" style={{ fontSize: 12 }}>{i + 1}.</span>
                <p className="text-muted-foreground" style={{ fontSize: 12 }}>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-8 pt-3 bg-card" style={{ borderTop: "1px solid hsl(var(--border))" }}>
        <motion.button className="btn-primary" onClick={() => navigate("product-list")} whileTap={{ scale: 0.97 }}>
          Shop to Earn More Entries
        </motion.button>
      </div>
    </div>
  );
};

// Need Award icon import
import { Award } from "lucide-react";
