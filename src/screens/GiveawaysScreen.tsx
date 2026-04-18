import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { GIVEAWAYS } from "@/data/giveaways";
import { RedeemSheet } from "@/components/RedeemSheet";
import { motion } from "framer-motion";
import { Award, Lock, ChevronRight, Check } from "lucide-react";
import type { Giveaway } from "@/types/app";

export const GiveawaysScreen: React.FC = () => {
  const { navigate, userPoints } = useApp();
  const [selectedGiveaway, setSelectedGiveaway] = useState<Giveaway | null>(null);
  const [enteredIds, setEnteredIds] = useState<Set<string>>(new Set());

  const getStatus = (g: Giveaway): Giveaway["status"] => {
    if (enteredIds.has(g.id)) return "entered";
    if (userPoints >= g.pointsRequired) return "eligible";
    return "locked";
  };

  const handleClose = () => {
    if (selectedGiveaway) {
      setEnteredIds((prev) => new Set(prev).add(selectedGiveaway.id));
    }
    setSelectedGiveaway(null);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-card" style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      {/* Header */}
      <div className="px-4 pt-2 pb-3 bg-card" style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
        <h1 className="font-semibold" style={{ fontSize: 18, letterSpacing: "-0.015em" }}>Destiny Deals</h1>
        <p className="text-muted-foreground" style={{ fontSize: 13 }}>Redeem points to enter exclusive prize draws</p>
      </div>

      {/* Balance bar */}
      <div className="px-4 py-2.5" style={{ background: "hsl(var(--ivory))", borderBottom: "1px solid hsl(var(--accent-muted) / 0.7)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award size={15} style={{ color: "hsl(var(--accent-dark))" }} />
            <span className="font-medium" style={{ fontSize: 13 }}>Your Balance</span>
          </div>
          <span className="font-semibold" style={{ fontSize: 16, color: "hsl(var(--accent-dark))" }}>
            {userPoints.toLocaleString()} pts
          </span>
        </div>
      </div>

      {/* Giveaway grid */}
      <div className="flex-1 overflow-y-auto px-4 pt-3.5" style={{ paddingBottom: 80 }}>
        <div className="grid grid-cols-2 gap-3">
          {GIVEAWAYS.map((g, i) => {
            const status = getStatus(g);
            const isLocked = status === "locked";
            const isEntered = status === "entered";

            return (
              <motion.button
                key={g.id}
                className="card-base card-lift overflow-hidden text-left"
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: isLocked ? 0.6 : 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (!isLocked && !isEntered) setSelectedGiveaway(g);
                }}
              >
                <div className="relative">
                  <img
                    src={g.image}
                    alt={g.name}
                    style={{ width: "100%", height: 108, objectFit: "cover" }}
                    loading="lazy"
                  />
                  {isLocked && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "hsl(222 22% 10% / 0.3)", backdropFilter: "blur(1px)" }}
                    >
                      <Lock size={18} style={{ color: "white" }} />
                    </div>
                  )}
                  {isEntered && (
                    <div
                      className="absolute top-2 right-2 px-2 py-0.5 flex items-center gap-1"
                      style={{ background: "hsl(var(--ledger-credit))", color: "white", fontSize: 10, fontWeight: 600, borderRadius: "var(--radius-sm)" }}
                    >
                      <Check size={10} /> Entered
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="font-medium leading-tight" style={{ fontSize: 13 }}>{g.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 11 }}>{g.value}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ fontSize: 13, color: isLocked ? "hsl(var(--muted-foreground))" : "hsl(var(--accent-dark))" }}
                    >
                      {g.pointsRequired} pts
                    </span>
                    {!isLocked && !isEntered && (
                      <ChevronRight size={14} style={{ color: "hsl(var(--primary))" }} />
                    )}
                  </div>
                  {isLocked && (
                    <div className="mt-1.5">
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (userPoints / g.pointsRequired) * 100)}%`,
                            background: "hsl(var(--accent))",
                          }}
                        />
                      </div>
                      <p className="text-muted-foreground mt-0.5" style={{ fontSize: 9 }}>
                        {g.pointsRequired - userPoints} pts to go
                      </p>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedGiveaway && (
        <RedeemSheet giveaway={selectedGiveaway} onClose={handleClose} />
      )}
    </div>
  );
};
