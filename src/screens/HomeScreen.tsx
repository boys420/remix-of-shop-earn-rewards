import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Search, Bell, ShoppingBag, Star, ChevronRight,
  Award, TrendingUp, Sparkles
} from "lucide-react";

const CATEGORIES = [
  { label: "Electronics", icon: "💻" },
  { label: "Clothing", icon: "👔" },
  { label: "Home", icon: "🏠" },
  { label: "Books", icon: "📚" },
  { label: "Sports", icon: "⚽" },
  { label: "Beauty", icon: "✨" },
];

const HERO_SLIDES = [
  {
    headline: "Shop Smarter,\nEarn Rewards",
    subtext: "Every purchase earns you points towards exclusive prizes",
    cta: "Start Shopping",
    bg: "linear-gradient(135deg, hsl(221 71% 38%), hsl(221 60% 48%))",
  },
  {
    headline: "New Giveaways\nAvailable Now",
    subtext: "Redeem your points for Smartwatches, Tablets & more",
    cta: "View Giveaways",
    bg: "linear-gradient(135deg, hsl(36 42% 40%), hsl(36 42% 52%))",
  },
  {
    headline: "Up to 25% Off\nTop Brands",
    subtext: "Plus earn double points on featured items this week",
    cta: "See Deals",
    bg: "linear-gradient(135deg, hsl(152 50% 32%), hsl(152 45% 42%))",
  },
];

const FEATURED = [
  {
    id: "p1", name: "Sony WH-1000XM5 Headphones", brand: "Sony",
    price: 279, originalPrice: 349, discount: 20, rating: 4.8, points: 139,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  },
  {
    id: "p2", name: "Nike Air Zoom Pegasus 40", brand: "Nike",
    price: 118, originalPrice: 140, discount: 16, rating: 4.6, points: 59,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
  },
];

const DEALS = [
  {
    id: "p3", name: "Kindle Paperwhite (16 GB)", brand: "Amazon",
    price: 119, originalPrice: 149, discount: 20, rating: 4.7, points: 60,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop",
  },
  {
    id: "p4", name: "Levi's 511 Slim Fit Jeans", brand: "Levi's",
    price: 59, originalPrice: 79, discount: 25, rating: 4.5, points: 30,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop",
  },
];

export const HomeScreen: React.FC = () => {
  const { navigate, userPoints, userEntries, cartCount } = useApp();
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((p) => (p + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Status bar */}
      <div className="status-bar" style={{ background: "hsl(var(--primary-dark))" }}>
        <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1">
          <span style={{ color: "white", fontSize: 10 }}>●●●</span>
        </div>
      </div>

      {/* Top bar */}
      <div className="px-4 pb-4 pt-1" style={{ background: "hsl(var(--primary-dark))" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} style={{ color: "hsl(var(--accent))" }} />
            <div>
              <p style={{ color: "hsl(0 0% 100% / 0.55)", fontSize: 11 }}>Deliver to</p>
              <p style={{ color: "white", fontSize: 13, fontWeight: 600 }}>New York, NY 10001</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button className="relative" whileTap={{ scale: 0.9 }}>
              <Bell size={20} strokeWidth={1.7} style={{ color: "white" }} />
              <span
                className="absolute -top-1 -right-1 rounded-full flex items-center justify-center"
                style={{ width: 14, height: 14, background: "hsl(var(--accent))", fontSize: 8, fontWeight: 700, color: "hsl(var(--accent-foreground))" }}
              >
                3
              </span>
            </motion.button>
            <motion.button onClick={() => navigate("cart")} className="relative" whileTap={{ scale: 0.9 }}>
              <ShoppingBag size={20} strokeWidth={1.7} style={{ color: "white" }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 rounded-full flex items-center justify-center"
                  style={{ width: 14, height: 14, background: "hsl(var(--accent))", fontSize: 8, fontWeight: 700, color: "hsl(var(--accent-foreground))" }}
                >
                  {cartCount}
                </span>
              )}
            </motion.button>
            <div
              className="flex items-center justify-center rounded-full font-bold"
              style={{ width: 32, height: 32, background: "hsl(0 0% 100% / 0.12)", color: "white", fontSize: 13 }}
            >
              AM
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "hsl(0 0% 100% / 0.10)" }}>
          <Search size={16} strokeWidth={1.7} style={{ color: "hsl(0 0% 100% / 0.5)" }} />
          <span style={{ color: "hsl(0 0% 100% / 0.45)", fontSize: 14 }}>Search products, brands...</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Hero carousel */}
        <div className="px-4 mt-3">
          <div className="relative rounded-2xl overflow-hidden" style={{ height: 156 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIdx}
                className="absolute inset-0 flex flex-col justify-center px-5"
                style={{ background: HERO_SLIDES[heroIdx].bg }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-bold leading-tight" style={{ fontSize: 19, color: "white", whiteSpace: "pre-line", letterSpacing: "-0.02em" }}>
                  {HERO_SLIDES[heroIdx].headline}
                </h2>
                <p style={{ fontSize: 12, color: "hsl(0 0% 100% / 0.7)", marginTop: 6 }}>
                  {HERO_SLIDES[heroIdx].subtext}
                </p>
                <button
                  className="mt-3 self-start rounded-lg px-4 py-2 font-semibold"
                  style={{ background: "hsl(0 0% 100% / 0.2)", color: "white", fontSize: 12, backdropFilter: "blur(4px)" }}
                  onClick={() => navigate(heroIdx === 1 ? "giveaways" : "product-list")}
                >
                  {HERO_SLIDES[heroIdx].cta}
                </button>
              </motion.div>
            </AnimatePresence>
            {/* Dots */}
            <div className="absolute bottom-3 right-4 flex gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: i === heroIdx ? 14 : 5,
                    height: 5,
                    background: i === heroIdx ? "white" : "hsl(0 0% 100% / 0.35)",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reward summary card */}
        <div className="px-4 mt-3">
          <motion.div
            className="rounded-xl p-4 flex items-center justify-between"
            style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted))" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("wallet")}
          >
            <div>
              <p className="text-muted-foreground font-medium mb-0.5" style={{ fontSize: 11, letterSpacing: "0.04em" }}>YOUR REWARDS</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold" style={{ fontSize: 26, color: "hsl(var(--accent-dark))", letterSpacing: "-0.02em" }}>
                  {userPoints.toLocaleString()}
                </span>
                <span className="text-muted-foreground font-medium" style={{ fontSize: 13 }}>pts</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <TrendingUp size={11} style={{ color: "hsl(var(--ledger-credit))" }} />
                <p style={{ fontSize: 11, color: "hsl(var(--ledger-credit))", fontWeight: 500 }}>+340 this week</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground font-medium mb-0.5" style={{ fontSize: 11, letterSpacing: "0.04em" }}>ENTRIES</p>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="font-bold" style={{ fontSize: 26, color: "hsl(var(--primary))", letterSpacing: "-0.02em" }}>
                  {userEntries}
                </span>
              </div>
              <span className="text-primary font-semibold flex items-center gap-0.5 ml-auto justify-end" style={{ fontSize: 12 }}>
                View wallet <ChevronRight size={12} />
              </span>
            </div>
          </motion.div>
        </div>

        {/* Giveaway preview */}
        <div className="px-4 mt-3">
          <motion.div
            className="rounded-xl p-3.5 flex items-center gap-3"
            style={{ background: "hsl(var(--primary-light))", border: "1px solid hsl(var(--primary-muted))" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("giveaways")}
          >
            <div className="flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ width: 36, height: 36, background: "hsl(var(--primary) / 0.1)" }}>
              <Award size={18} className="text-primary" strokeWidth={1.7} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate" style={{ fontSize: 13 }}>
                10 prizes available — Redeem points now
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 11 }}>From 50 to 1,200 points</p>
            </div>
            <ChevronRight size={16} className="text-primary flex-shrink-0" />
          </motion.div>
        </div>

        {/* Categories */}
        <div className="mt-5 px-4">
          <div className="section-header">
            <span className="section-title">Categories</span>
            <button className="section-link" onClick={() => navigate("product-list")}>All</button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.label}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
                onClick={() => navigate("product-list")}
                whileTap={{ scale: 0.93 }}
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: 52, height: 52, background: "hsl(var(--card))", boxShadow: "var(--shadow-card)", fontSize: 22 }}
                >
                  {cat.icon}
                </div>
                <span className="text-muted-foreground font-medium" style={{ fontSize: 10 }}>{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured products */}
        <div className="mt-5 px-4">
          <div className="section-header">
            <span className="section-title">Featured</span>
            <button className="section-link" onClick={() => navigate("product-list")}>See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {FEATURED.map((product) => (
              <motion.button
                key={product.id}
                className="product-card flex-shrink-0"
                style={{ width: 175 }}
                onClick={() => navigate("product-detail")}
                whileTap={{ scale: 0.97 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: 140, objectFit: "cover" }}
                />
                <div className="p-2.5">
                  <p className="text-muted-foreground font-medium" style={{ fontSize: 10 }}>{product.brand}</p>
                  <p className="font-medium text-foreground leading-tight mt-0.5" style={{ fontSize: 13 }}>
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star size={10} fill="hsl(var(--accent))" stroke="none" />
                    <span style={{ fontSize: 11, color: "hsl(var(--accent-dark))" }}>{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-bold text-foreground" style={{ fontSize: 15 }}>${product.price}</span>
                      <span className="text-muted-foreground line-through ml-1.5" style={{ fontSize: 11 }}>${product.originalPrice}</span>
                    </div>
                    <span
                      className="rounded font-semibold"
                      style={{ background: "hsl(var(--secondary-light))", color: "hsl(var(--secondary))", fontSize: 10, padding: "1px 5px" }}
                    >
                      -{product.discount}%
                    </span>
                  </div>
                  <div className="reward-badge mt-2">
                    <Sparkles size={10} /> +{product.points} pts
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Today's deals */}
        <div className="mt-5 px-4">
          <div className="section-header">
            <span className="section-title">Today's Deals</span>
            <button className="section-link" onClick={() => navigate("product-list")}>See all</button>
          </div>
          <div className="flex flex-col gap-3">
            {DEALS.map((product) => (
              <motion.button
                key={product.id}
                className="product-card flex items-center gap-3 p-3"
                onClick={() => navigate("product-detail")}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }}
                />
                <div className="flex-1 text-left">
                  <p className="text-muted-foreground font-medium" style={{ fontSize: 10 }}>{product.brand}</p>
                  <p className="font-medium text-foreground leading-tight mt-0.5" style={{ fontSize: 13 }}>
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={10} fill="hsl(var(--accent))" stroke="none" />
                    <span style={{ fontSize: 11, color: "hsl(var(--accent-dark))" }}>{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-bold text-foreground" style={{ fontSize: 15 }}>${product.price}</span>
                    <span className="text-muted-foreground line-through" style={{ fontSize: 11 }}>${product.originalPrice}</span>
                    <div className="reward-badge">+{product.points} pts</div>
                  </div>
                </div>
                <span
                  className="rounded font-semibold self-start mt-1"
                  style={{ background: "hsl(var(--secondary-light))", color: "hsl(var(--secondary))", fontSize: 10, padding: "2px 6px" }}
                >
                  -{product.discount}%
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
