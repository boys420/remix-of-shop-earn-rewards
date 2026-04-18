import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

export const SplashScreen: React.FC = () => {
  const { navigate } = useApp();

  useEffect(() => {
    const t = setTimeout(() => navigate("onboarding"), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full mesh-plum overflow-hidden">
      {/* Floating ambient orbs */}
      <div className="orb" style={{ width: 220, height: 220, top: "12%", left: "-10%", background: "hsl(290 80% 55%)" }} />
      <div className="orb" style={{ width: 180, height: 180, bottom: "18%", right: "-8%", background: "hsl(38 70% 55%)", animationDelay: "1.2s" }} />
      <div className="orb" style={{ width: 140, height: 140, top: "55%", left: "20%", background: "hsl(290 60% 40%)", animationDelay: "2.4s" }} />

      <motion.div
        className="relative flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative flex items-center justify-center shine-overlay"
          style={{
            width: 78,
            height: 78,
            borderRadius: 22,
            background: "hsl(0 0% 100% / 0.08)",
            border: "1px solid hsl(0 0% 100% / 0.14)",
            boxShadow: "0 12px 40px 0 hsl(290 70% 12% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.18)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="1" />
                <stop offset="1" stopColor="white" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <path d="M19 4 L31 11 L31 25 L19 32 L7 25 L7 11 Z" fill="url(#logoGrad)" />
            <path d="M19 13 L25 16.5 L25 21.5 L19 25 L13 21.5 L13 16.5 Z" fill="hsl(290 60% 22%)" />
            <circle cx="19" cy="19" r="2" fill="white" />
          </svg>
        </motion.div>

        <div className="text-center">
          <motion.h1
            className="font-semibold"
            style={{ color: "white", fontSize: 30, letterSpacing: "-0.035em" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Gleepick
          </motion.h1>
          <motion.p
            className="mt-1.5 font-medium"
            style={{ color: "hsl(0 0% 100% / 0.55)", fontSize: 13, letterSpacing: "0.04em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Shop · Earn · Destiny Deals
          </motion.p>
        </div>
      </motion.div>

      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
        style={{ width: 110, height: 2, background: "hsl(0 0% 100% / 0.1)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(0 0% 100% / 0.3), hsl(0 0% 100% / 0.85), hsl(0 0% 100% / 0.3))" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
