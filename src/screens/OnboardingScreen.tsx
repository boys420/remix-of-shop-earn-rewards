import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingBag, Award, Wallet } from "lucide-react";

const SLIDES = [
  {
    title: "Your everyday shopping,\nnow with rewards",
    body: "Every purchase you complete earns points. Points convert into wallet balance or contest entries. No tricks, no conditions.",
    icon: ShoppingBag,
    iconBg: "hsl(var(--primary-light))",
    iconColor: "hsl(var(--primary))",
  },
  {
    title: "Transparent rewards,\nlive ledger",
    body: "See exactly how many points you've earned, from which order, and when. Your rewards are always visible in your wallet.",
    icon: Wallet,
    iconBg: "hsl(var(--accent-light))",
    iconColor: "hsl(var(--accent-dark))",
  },
  {
    title: "Giveaways earned,\nnot purchased",
    body: "Redeem your points for exclusive prizes — from earbuds to international trips. No gambling, no luck. Just rewards.",
    icon: Award,
    iconBg: "hsl(var(--primary-light))",
    iconColor: "hsl(var(--primary))",
  },
];

export const OnboardingScreen: React.FC = () => {
  const { navigate } = useApp();
  const [idx, setIdx] = useState(0);

  const next = () => {
    if (idx < SLIDES.length - 1) setIdx(idx + 1);
    else navigate("login");
  };

  const slide = SLIDES[idx];
  const Icon = slide.icon;

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex justify-end px-5 pt-6 pb-2">
        <button className="text-muted-foreground font-medium" style={{ fontSize: 13 }} onClick={() => navigate("login")}>
          Skip
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className="flex flex-col gap-8 w-full"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex justify-center">
              <div
                className="flex items-center justify-center"
                style={{ width: 92, height: 92, background: slide.iconBg, borderRadius: "var(--radius-lg)" }}
              >
                <Icon size={42} strokeWidth={1.3} style={{ color: slide.iconColor }} />
              </div>
            </div>
            <div>
              <h2 className="font-semibold leading-tight mb-3" style={{ fontSize: 23, letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>
                {slide.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 14, lineHeight: 1.6 }}>{slide.body}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-5 safe-bottom flex flex-col gap-5 pb-10">
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === idx ? 20 : 6, height: 5,
                background: i === idx ? "hsl(var(--primary))" : "hsl(var(--muted))",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
        <motion.button className="btn-primary flex items-center justify-center gap-2" onClick={next} whileTap={{ scale: 0.98 }}>
          {idx < SLIDES.length - 1 ? "Continue" : "Get Started"}
          <ChevronRight size={16} />
        </motion.button>
        <button className="text-center text-muted-foreground font-medium" style={{ fontSize: 13 }} onClick={() => navigate("login")}>
          Already have an account? <span className="text-primary">Sign in</span>
        </button>
      </div>
    </div>
  );
};
