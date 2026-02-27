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
    <div
      className="flex flex-col items-center justify-center h-full"
      style={{ background: "linear-gradient(160deg, hsl(221 71% 35%), hsl(221 60% 45%))" }}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo mark */}
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{
            width: 72,
            height: 72,
            background: "hsl(0 0% 100% / 0.1)",
            border: "1.5px solid hsl(0 0% 100% / 0.18)",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <rect x="5" y="14" width="28" height="20" rx="3" fill="white" opacity="0.9" />
            <path d="M12 14v-3a7 7 0 0 1 14 0v3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="19" cy="24" r="3" fill="hsl(221 71% 40%)" />
          </svg>
        </div>
        <div className="text-center">
          <h1
            className="font-bold tracking-tight"
            style={{ color: "white", fontSize: 28, letterSpacing: "-0.03em" }}
          >
            RegalShop
          </h1>
          <p
            className="mt-1 font-medium"
            style={{ color: "hsl(0 0% 100% / 0.55)", fontSize: 13 }}
          >
            Shop &amp; Get Rewarded
          </p>
        </div>
      </motion.div>

      {/* Loading bar */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
        style={{ width: 140, height: 2, background: "hsl(0 0% 100% / 0.15)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "white" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
