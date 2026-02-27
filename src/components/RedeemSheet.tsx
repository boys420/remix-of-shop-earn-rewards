import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Award } from "lucide-react";
import type { Giveaway } from "@/types/app";

interface RedeemSheetProps {
  giveaway: Giveaway | null;
  onClose: () => void;
}

export const RedeemSheet: React.FC<RedeemSheetProps> = ({ giveaway, onClose }) => {
  const { userPoints, deductPoints } = useApp();
  const [confirmed, setConfirmed] = useState(false);

  if (!giveaway) return null;

  const canAfford = userPoints >= giveaway.pointsRequired;
  const remaining = userPoints - giveaway.pointsRequired;

  const handleConfirm = () => {
    if (!canAfford) return;
    deductPoints(giveaway.pointsRequired);
    setConfirmed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="sheet-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="sheet-content"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />

        {!confirmed ? (
          <div className="px-5 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold" style={{ fontSize: 18 }}>Confirm Entry</h3>
              <button onClick={onClose} className="p-1.5 rounded-full" style={{ background: "hsl(var(--muted))" }}>
                <X size={16} />
              </button>
            </div>

            {/* Prize preview */}
            <div className="flex items-center gap-4 p-4 rounded-xl mb-5" style={{ background: "hsl(var(--muted))" }}>
              <img
                src={giveaway.image}
                alt={giveaway.name}
                className="rounded-lg"
                style={{ width: 72, height: 72, objectFit: "cover" }}
              />
              <div>
                <p className="font-bold" style={{ fontSize: 16 }}>{giveaway.name}</p>
                <p className="text-muted-foreground" style={{ fontSize: 13 }}>Value: {giveaway.value}</p>
              </div>
            </div>

            {/* Points breakdown */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{ fontSize: 14 }}>Points required</span>
                <span className="font-semibold" style={{ fontSize: 14 }}>{giveaway.pointsRequired} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{ fontSize: 14 }}>Your balance</span>
                <span className="font-semibold" style={{ fontSize: 14, color: "hsl(var(--accent-dark))" }}>{userPoints.toLocaleString()} pts</span>
              </div>
              <div className="border-t pt-3 flex justify-between" style={{ borderColor: "hsl(var(--border))" }}>
                <span className="font-semibold" style={{ fontSize: 14 }}>Balance after entry</span>
                <span className="font-bold" style={{ fontSize: 14, color: canAfford ? "hsl(var(--ledger-credit))" : "hsl(var(--ledger-debit))" }}>
                  {canAfford ? `${remaining.toLocaleString()} pts` : "Insufficient"}
                </span>
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={handleConfirm}
              disabled={!canAfford}
              style={{ opacity: canAfford ? 1 : 0.5 }}
            >
              {canAfford ? `Enter Giveaway — ${giveaway.pointsRequired} pts` : "Not Enough Points"}
            </button>

            <p className="text-center text-muted-foreground mt-3" style={{ fontSize: 11 }}>
              Points will be deducted immediately upon entry
            </p>
          </div>
        ) : (
          <motion.div
            className="px-5 pb-8 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="flex items-center justify-center rounded-full mt-4 mb-4"
              style={{ width: 64, height: 64, background: "hsl(var(--ledger-credit) / 0.1)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.15 }}
            >
              <Check size={28} style={{ color: "hsl(var(--ledger-credit))" }} />
            </motion.div>
            <h3 className="font-bold mb-1" style={{ fontSize: 18 }}>Entry Confirmed</h3>
            <p className="text-muted-foreground text-center mb-5" style={{ fontSize: 13 }}>
              You've entered the {giveaway.name} giveaway. Good luck!
            </p>

            <div className="w-full p-4 rounded-xl mb-5" style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted))" }}>
              <div className="flex items-center gap-2 mb-2">
                <Award size={14} style={{ color: "hsl(var(--accent-dark))" }} />
                <span className="font-semibold" style={{ fontSize: 13 }}>Entry details</span>
              </div>
              <div className="flex justify-between mb-1.5">
                <span className="text-muted-foreground" style={{ fontSize: 12 }}>Prize</span>
                <span className="font-medium" style={{ fontSize: 12 }}>{giveaway.name}</span>
              </div>
              <div className="flex justify-between mb-1.5">
                <span className="text-muted-foreground" style={{ fontSize: 12 }}>Points used</span>
                <span className="font-medium" style={{ fontSize: 12 }}>{giveaway.pointsRequired} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{ fontSize: 12 }}>New balance</span>
                <span className="font-semibold" style={{ fontSize: 12, color: "hsl(var(--accent-dark))" }}>{remaining.toLocaleString()} pts</span>
              </div>
            </div>

            <button className="btn-primary" onClick={onClose}>
              Done
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
