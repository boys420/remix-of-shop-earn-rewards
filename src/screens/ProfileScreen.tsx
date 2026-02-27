import React from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  Package, Award, MapPin, Settings, Headphones,
  ChevronRight, Shield, Bell, LogOut, Gift
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Screen } from "@/types/app";

const MENU_ITEMS: { label: string; icon: LucideIcon; badge: string; screen: Screen }[] = [
  { label: "My Orders", icon: Package, badge: "3 active", screen: "home" },
  { label: "Rewards & Giveaways", icon: Gift, badge: "", screen: "giveaways" },
  { label: "My Entries", icon: Award, badge: "4 entries", screen: "my-entries" },
  { label: "Saved Addresses", icon: MapPin, badge: "", screen: "home" },
  { label: "Notifications", icon: Bell, badge: "3 new", screen: "home" },
  { label: "Security & Privacy", icon: Shield, badge: "", screen: "home" },
  { label: "Settings", icon: Settings, badge: "", screen: "home" },
  { label: "Help & Support", icon: Headphones, badge: "", screen: "home" },
];

export const ProfileScreen: React.FC = () => {
  const { navigate, userPoints } = useApp();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-card" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Profile header */}
        <div className="px-4 py-4 bg-card" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <div className="flex items-center gap-3.5">
            <div
              className="flex items-center justify-center rounded-full font-semibold flex-shrink-0"
              style={{ width: 56, height: 56, background: "hsl(var(--primary-dark))", color: "white", fontSize: 20 }}
            >
              AM
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold" style={{ fontSize: 17 }}>Alex Morgan</h2>
              <p className="text-muted-foreground" style={{ fontSize: 13 }}>alex.morgan@example.com</p>
              <p className="text-muted-foreground" style={{ fontSize: 11 }}>Member since Feb 2025</p>
            </div>
            <button className="text-primary" style={{ fontSize: 13, fontWeight: 500 }}>Edit</button>
          </div>
        </div>

        {/* Reward tier */}
        <div className="mx-4 mt-3">
          <div className="rounded-lg p-3.5" style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted))" }}>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <p className="text-muted-foreground font-medium" style={{ fontSize: 10, letterSpacing: "0.04em" }}>MEMBER TIER</p>
                <p className="font-semibold" style={{ fontSize: 17, color: "hsl(var(--accent-dark))" }}>Gold Member</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground" style={{ fontSize: 10 }}>Total points</p>
                <p className="font-semibold" style={{ fontSize: 18, color: "hsl(var(--accent-dark))" }}>{userPoints.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-muted-foreground" style={{ fontSize: 11 }}>Gold</span>
              <span className="text-muted-foreground" style={{ fontSize: 11 }}>Platinum · 10,000 pts</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--accent-muted))" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "hsl(var(--accent))" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (userPoints / 10000) * 100)}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
            <p className="text-muted-foreground mt-1.5" style={{ fontSize: 11 }}>
              {(10000 - userPoints).toLocaleString()} pts to Platinum
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2.5 mx-4 mt-3">
          {[
            { label: "Orders", value: "12" },
            { label: "Reviews", value: "8" },
            { label: "Entries", value: "4" },
          ].map((stat) => (
            <div key={stat.label} className="card-base p-3 text-center">
              <p className="font-semibold" style={{ fontSize: 20, letterSpacing: "-0.02em" }}>{stat.value}</p>
              <p className="text-muted-foreground" style={{ fontSize: 11 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div className="mx-4 mt-4">
          <div className="section-header">
            <span className="section-title">Recent Orders</span>
            <button className="section-link">View all</button>
          </div>
          <div className="card-base px-4">
            {[
              { id: "#RS-88412", date: "Feb 18, 2026", status: "Processing", total: "$429.84", items: 2 },
              { id: "#RS-88410", date: "Feb 16, 2026", status: "Delivered", total: "$284.00", items: 3 },
              { id: "#RS-88387", date: "Feb 12, 2026", status: "Delivered", total: "$119.00", items: 1 },
            ].map((order) => (
              <div key={order.id} className="ledger-row">
                <div>
                  <p className="font-medium" style={{ fontSize: 13 }}>{order.id}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 12 }}>{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium" style={{ fontSize: 13 }}>{order.total}</p>
                  <span
                    className="inline-block rounded-md font-medium px-2 py-0.5"
                    style={{
                      fontSize: 10,
                      background: order.status === "Delivered" ? "hsl(152 45% 38% / 0.06)" : "hsl(var(--primary-light))",
                      color: order.status === "Delivered" ? "hsl(var(--ledger-credit))" : "hsl(var(--primary))",
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="mx-4 mt-4 card-base overflow-hidden">
          {MENU_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ borderBottom: i < MENU_ITEMS.length - 1 ? "1px solid hsl(var(--border))" : "none" }}
                onClick={() => navigate(item.screen)}
                whileTap={{ scale: 0.99 }}
              >
                <div
                  className="flex items-center justify-center rounded-md flex-shrink-0"
                  style={{ width: 32, height: 32, background: "hsl(var(--muted))" }}
                >
                  <Icon size={16} strokeWidth={1.6} className="text-muted-foreground" />
                </div>
                <span className="flex-1 font-medium" style={{ fontSize: 14 }}>{item.label}</span>
                {item.badge && (
                  <span
                    className="rounded-md font-medium px-2 py-0.5"
                    style={{
                      fontSize: 11,
                      background: item.badge.includes("new") ? "hsl(var(--primary))" : "hsl(var(--muted))",
                      color: item.badge.includes("new") ? "white" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={15} className="text-muted-foreground" />
              </motion.button>
            );
          })}
        </div>

        {/* Sign out */}
        <div className="mx-4 mt-3 mb-4">
          <motion.button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg"
            style={{ fontSize: 14, color: "hsl(var(--secondary))", fontWeight: 500, border: "1px solid hsl(var(--border))" }}
            onClick={() => navigate("login")}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={15} strokeWidth={1.6} />
            Sign Out
          </motion.button>
        </div>
      </div>
    </div>
  );
};
