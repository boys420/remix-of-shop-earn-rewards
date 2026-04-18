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
              className="p-1.5"
              style={{
                background: isActive ? "hsl(var(--primary) / 0.08)" : "transparent",
                borderRadius: "var(--radius-sm)",
              }}
              whileTap={{ scale: 0.88 }}
              transition={{ duration: 0.08 }}
            >
              <Icon size={20} strokeWidth={isActive ? 1.8 : 1.5} />
            </motion.div>
            <span style={{ fontWeight: isActive ? 600 : 400, fontSize: 10 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
