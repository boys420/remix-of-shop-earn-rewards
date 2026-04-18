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
      style={{ background: "linear-gradient(160deg, hsl(290 55% 18%), hsl(290 45% 28%))" }}
    >
      <motion.div
        className="flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex items-center justify-center"
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "hsl(0 0% 100% / 0.07)",
            border: "1px solid hsl(0 0% 100% / 0.1)",
            boxShadow: "0 8px 32px 0 hsl(290 55% 12% / 0.35)",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="34" height="34" viewBox="0 0 38 38" fill="none">
            <path d="M19 4 L31 11 L31 25 L19 32 L7 25 L7 11 Z" fill="white" opacity="0.95" />
            <path d="M19 13 L25 16.5 L25 21.5 L19 25 L13 21.5 L13 16.5 Z" fill="hsl(290 55% 22%)" />
            <circle cx="19" cy="19" r="2" fill="white" />
          </svg>
        </motion.div>
        <div className="text-center">
          <h1
            className="font-semibold"
            style={{ color: "white", fontSize: 28, letterSpacing: "-0.03em" }}
          >
            Gleepick
          </h1>
          <p
            className="mt-1.5 font-medium"
            style={{ color: "hsl(0 0% 100% / 0.45)", fontSize: 13, letterSpacing: "0.02em" }}
          >
            Shop · Earn · Destiny Deals
          </p>
        </div>
      </motion.div>

      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
        style={{ width: 100, height: 2, background: "hsl(0 0% 100% / 0.08)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "hsl(0 0% 100% / 0.5)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
