import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Clock, Users, ChevronRight, Info } from "lucide-react";

const CONTESTS = [
  {
    id: "c1", title: "iPhone 15 Pro — Monthly Destiny Deal", prize: "iPhone 15 Pro 256GB",
    prizeValue: 99999, status: "active" as const, endsAt: "Feb 24, 2026",
    minEntries: 1, userEntries: 7, totalEntries: 4821,
    requirement: "Complete any order of ₹4,000+",
    color: "hsl(var(--primary-light))", borderColor: "hsl(var(--primary-muted))",
  },
  {
    id: "c2", title: "Sony PlayStation 5 Bundle", prize: "PS5 + 2 Controllers + Game",
    prizeValue: 58999, status: "joined" as const, endsAt: "Mar 01, 2026",
    minEntries: 2, userEntries: 3, totalEntries: 2341,
    requirement: "Complete orders totalling ₹8,000+",
    color: "hsl(var(--ivory))", borderColor: "hsl(var(--accent-muted))",
  },
  {
    id: "c3", title: "MacBook Air M3 — Spring Edition", prize: "MacBook Air M3 13-inch",
    prizeValue: 107999, status: "upcoming" as const, endsAt: "Mar 15, 2026",
    minEntries: 3, userEntries: 0, totalEntries: 0,
    requirement: "Complete any Electronics purchase",
    color: "hsl(var(--muted))", borderColor: "hsl(var(--border))",
  },
  {
    id: "c4", title: "Dyson V15 Vacuum Cleaner", prize: "Dyson V15 Detect",
    prizeValue: 62999, status: "active" as const, endsAt: "Feb 28, 2026",
    minEntries: 1, userEntries: 2, totalEntries: 1894,
    requirement: "Complete any Home & Kitchen order",
    color: "hsl(var(--primary-light))", borderColor: "hsl(var(--primary-muted))",
  },
];

const STATUS_LABELS: Record<string, string> = { active: "Active", upcoming: "Upcoming", joined: "Joined" };

export const ContestsScreen: React.FC = () => {
  const { navigate } = useApp();
  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | "joined">("all");
  const filtered = filter === "all" ? CONTESTS : CONTESTS.filter((c) => c.status === filter);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-card" style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="px-4 pt-2 pb-3 bg-card" style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
        <h1 className="font-semibold mb-0.5" style={{ fontSize: 18, letterSpacing: "-0.015em" }}>Destiny Deals</h1>
        <p className="text-muted-foreground" style={{ fontSize: 13 }}>Entries earned through purchases only</p>
      </div>

      {/* Info banner */}
      <div className="mx-4 mt-3 p-3" style={{ background: "hsl(var(--primary-light))", border: "1px solid hsl(var(--primary-muted) / 0.7)", borderRadius: "var(--radius)" }}>
        <div className="flex items-center gap-2 mb-1">
          <Info size={14} className="text-primary" strokeWidth={1.5} />
          <p className="font-medium" style={{ fontSize: 13 }}>How Destiny entries work</p>
        </div>
        <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 12, lineHeight: 1.5 }}>
          Complete eligible purchases to earn entries. Each qualifying order automatically adds entries to open Destiny Deals.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 py-2.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {(["all", "active", "upcoming", "joined"] as const).map((f) => (
          <button key={f} className={filter === f ? "chip-active" : "chip-outline"} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Contest list */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2.5" style={{ paddingBottom: 80 }}>
        {filtered.map((contest, i) => (
          <motion.button
            key={contest.id}
            className="contest-card text-left"
            onClick={() => navigate("contest-detail")}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.18 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="px-4 pt-3 pb-2.5" style={{ background: contest.color, borderBottom: `1px solid ${contest.borderColor}` }}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium leading-tight" style={{ fontSize: 14 }}>{contest.title}</h3>
                <span
                  className="font-medium flex-shrink-0 px-2 py-0.5"
                  style={{
                    fontSize: 11,
                    borderRadius: "var(--radius-sm)",
                    background: contest.status === "active" ? "hsl(var(--primary))"
                      : contest.status === "joined" ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
                    color: "white",
                  }}
                >
                  {STATUS_LABELS[contest.status]}
                </span>
              </div>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: 12 }}>Prize: {contest.prize}</p>
              <p className="font-semibold mt-0.5" style={{ fontSize: 17, color: "hsl(var(--accent-dark))", letterSpacing: "-0.01em" }}>
                ₹{contest.prizeValue.toLocaleString("en-IN")} value
              </p>
            </div>

            <div className="px-4 py-3">
              <div className="flex items-center gap-4 mb-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock size={13} strokeWidth={1.5} />
                  <span style={{ fontSize: 12 }}>Ends {contest.endsAt}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users size={13} strokeWidth={1.5} />
                  <span style={{ fontSize: 12 }}>{contest.totalEntries.toLocaleString()} entries</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 11 }}>Requirement</p>
                  <p className="font-medium" style={{ fontSize: 12 }}>{contest.requirement}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground" style={{ fontSize: 11 }}>Your entries</p>
                  <p
                    className="font-semibold"
                    style={{ fontSize: 17, color: contest.userEntries > 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                  >
                    {contest.userEntries}
                  </p>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
