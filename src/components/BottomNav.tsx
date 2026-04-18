import React from "react";
import { useApp } from "@/context/AppContext";
import type { Screen } from "@/types/app";
import { Home, Store, Gift, Wallet, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const NAV_ITEMS: { label: string; icon: LucideIcon; screen: Screen }[] = [
  { label: "Home", icon: Home, screen: "home" },
  { label: "Shop", icon: Store, screen: "product-list" },
  { label: "Destiny", icon: Gift, screen: "giveaways" },
  { label: "Wallet", icon: Wallet, screen: "wallet" },
  { label: "Profile", icon: UserCircle, screen: "profile" },
];

const MAIN_SCREENS: Screen[] = ["home", "product-list", "giveaways", "contests", "wallet", "profile"];

export const BottomNav: React.FC = () => {
  const { screen, navigate } = useApp();

  if (!MAIN_SCREENS.includes(screen)) return null;

  return (
    <nav className="bottom-nav" style={{ width: "100%", maxWidth: "390px", left: "50%", transform: "translateX(-50%)" }}>
      {NAV_ITEMS.map((item) => {
        const isActive = screen === item.screen;
        const Icon = item.icon;
        return (
          <button
            key={item.screen}
            className={`nav-item ${isActive ? "active" : ""}`}
            onClick={() => navigate(item.screen)}
            aria-label={item.label}
          >
            <motion.div
              className="relative p-1.5"
              style={{ borderRadius: "var(--radius-sm)" }}
              whileTap={{ scale: 0.86 }}
              transition={{ duration: 0.1 }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0"
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid hsl(var(--primary) / 0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <motion.div
                className="relative"
                animate={{ y: isActive ? -1 : 0, scale: isActive ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              </motion.div>
            </motion.div>
            <motion.span
              animate={{ fontWeight: isActive ? 600 : 400, opacity: isActive ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: 10 }}
            >
              {item.label}
            </motion.span>
          </button>
        );
      })}
    </nav>
  );
};
