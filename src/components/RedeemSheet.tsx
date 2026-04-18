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
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <motion.div
        className="sheet-content"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />

        {!confirmed ? (
          <div className="px-5 pb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold" style={{ fontSize: 17 }}>Confirm Entry</h3>
              <motion.button
                onClick={onClose}
                className="p-1.5"
                style={{ background: "hsl(var(--muted))", borderRadius: "50%" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.08 }}
              >
                <X size={15} />
              </motion.button>
            </div>

            {/* Prize preview */}
            <div className="flex items-center gap-4 p-3.5 mb-5" style={{ background: "hsl(var(--surface-2))", borderRadius: "var(--radius)" }}>
              <img
                src={giveaway.image}
                alt={giveaway.name}
                style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "var(--radius-sm)" }}
              />
              <div>
                <p className="font-semibold" style={{ fontSize: 15 }}>{giveaway.name}</p>
                <p className="text-muted-foreground" style={{ fontSize: 13 }}>Value: {giveaway.value}</p>
              </div>
            </div>

            {/* Points breakdown */}
            <div className="flex flex-col gap-2.5 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>Points required</span>
                <span className="font-medium" style={{ fontSize: 13 }}>{giveaway.pointsRequired} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>Your balance</span>
                <span className="font-medium" style={{ fontSize: 13, color: "hsl(var(--accent-dark))" }}>{userPoints.toLocaleString()} pts</span>
              </div>
              <div className="pt-2.5 flex justify-between" style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
                <span className="font-medium" style={{ fontSize: 13 }}>Balance after entry</span>
                <span className="font-semibold" style={{ fontSize: 13, color: canAfford ? "hsl(var(--ledger-credit))" : "hsl(var(--ledger-debit))" }}>
                  {canAfford ? `${remaining.toLocaleString()} pts` : "Insufficient"}
                </span>
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={handleConfirm}
              disabled={!canAfford}
            >
              {canAfford ? `Enter Destiny Deal — ${giveaway.pointsRequired} pts` : "Not Enough Points"}
            </button>

            <p className="text-center text-muted-foreground mt-3" style={{ fontSize: 11 }}>
              Points will be deducted immediately upon entry
            </p>
          </div>
        ) : (
          <motion.div
            className="px-5 pb-6 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.06, duration: 0.22 }}
          >
            <motion.div
              className="relative flex items-center justify-center rounded-full mt-4 mb-4"
              style={{ width: 64, height: 64, background: "hsl(var(--ledger-credit) / 0.1)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 14, stiffness: 220, delay: 0.08 }}
            >
              {/* Rippling success ring */}
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid hsl(var(--ledger-credit) / 0.4)" }}
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.18 }}
              />
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid hsl(var(--ledger-credit) / 0.3)" }}
                initial={{ scale: 0.6, opacity: 0.6 }}
                animate={{ scale: 2.1, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.32 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 260, delay: 0.18 }}
              >
                <Check size={28} strokeWidth={2.4} style={{ color: "hsl(var(--ledger-credit))" }} />
              </motion.div>
            </motion.div>
            <h3 className="font-semibold mb-1" style={{ fontSize: 17 }}>Entry Confirmed</h3>
            <p className="text-muted-foreground text-center mb-5" style={{ fontSize: 13 }}>
              You've entered the {giveaway.name} Destiny Deal. Good luck!
            </p>

            <div className="w-full p-3.5 mb-5" style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted) / 0.7)", borderRadius: "var(--radius)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Award size={13} style={{ color: "hsl(var(--accent-dark))" }} />
                <span className="font-medium" style={{ fontSize: 13 }}>Entry details</span>
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
                <span className="font-medium" style={{ fontSize: 12, color: "hsl(var(--accent-dark))" }}>{remaining.toLocaleString()} pts</span>
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
