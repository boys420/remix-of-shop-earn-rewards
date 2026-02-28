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
    bg: "linear-gradient(135deg, hsl(222 68% 22%), hsl(222 55% 32%))",
  },
  {
    headline: "New Giveaways\nAvailable Now",
    subtext: "Redeem your points for Smartwatches, Tablets & more",
    cta: "View Giveaways",
    bg: "linear-gradient(135deg, hsl(38 48% 30%), hsl(38 42% 42%))",
  },
  {
    headline: "Up to 25% Off\nTop Brands",
    subtext: "Plus earn double points on featured items this week",
    cta: "See Deals",
    bg: "linear-gradient(135deg, hsl(158 42% 26%), hsl(158 38% 36%))",
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
      <div className="px-4 pb-4 pt-1.5" style={{ background: "hsl(var(--primary-dark))" }}>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <MapPin size={13} style={{ color: "hsl(var(--accent))" }} />
            <div>
              <p style={{ color: "hsl(0 0% 100% / 0.45)", fontSize: 10, fontWeight: 500 }}>Deliver to</p>
              <p style={{ color: "white", fontSize: 13, fontWeight: 500 }}>New York, NY 10001</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <motion.button className="relative" whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
              <Bell size={19} strokeWidth={1.5} style={{ color: "hsl(0 0% 100% / 0.85)" }} />
              <span
                className="absolute -top-1 -right-1 rounded-full flex items-center justify-center"
                style={{ width: 15, height: 15, background: "hsl(var(--accent))", fontSize: 8, fontWeight: 700, color: "hsl(var(--accent-foreground))" }}
              >
                3
              </span>
            </motion.button>
            <motion.button onClick={() => navigate("cart")} className="relative" whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
              <ShoppingBag size={19} strokeWidth={1.5} style={{ color: "hsl(0 0% 100% / 0.85)" }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 rounded-full flex items-center justify-center"
                  style={{ width: 15, height: 15, background: "hsl(var(--accent))", fontSize: 8, fontWeight: 700, color: "hsl(var(--accent-foreground))" }}
                >
                  {cartCount}
                </span>
              )}
            </motion.button>
            <div
              className="flex items-center justify-center rounded-full font-semibold"
              style={{ width: 32, height: 32, background: "hsl(0 0% 100% / 0.1)", color: "white", fontSize: 12, border: "1px solid hsl(0 0% 100% / 0.08)" }}
            >
              AM
            </div>
          </div>
        </div>

        {/* Search */}
        <motion.div
          className="flex items-center gap-2.5 px-3.5 py-2.5"
          style={{ background: "hsl(0 0% 100% / 0.08)", borderRadius: "var(--radius)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
          whileTap={{ scale: 0.99 }}
        >
          <Search size={15} strokeWidth={1.5} style={{ color: "hsl(0 0% 100% / 0.4)" }} />
          <span style={{ color: "hsl(0 0% 100% / 0.35)", fontSize: 14 }}>Search products, brands...</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Hero carousel */}
        <div className="px-4 mt-3.5">
          <div className="relative overflow-hidden" style={{ height: 156, borderRadius: "var(--radius-lg)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIdx}
                className="absolute inset-0 flex flex-col justify-center px-5"
                style={{ background: HERO_SLIDES[heroIdx].bg }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <h2 className="font-semibold leading-tight" style={{ fontSize: 18, color: "white", whiteSpace: "pre-line", letterSpacing: "-0.02em" }}>
                  {HERO_SLIDES[heroIdx].headline}
                </h2>
                <p style={{ fontSize: 12, color: "hsl(0 0% 100% / 0.6)", marginTop: 6, lineHeight: 1.5 }}>
                  {HERO_SLIDES[heroIdx].subtext}
                </p>
                <button
                  className="mt-3.5 self-start px-4 py-2 font-medium"
                  style={{ background: "hsl(0 0% 100% / 0.14)", color: "white", fontSize: 12, borderRadius: "var(--radius-sm)", border: "1px solid hsl(0 0% 100% / 0.08)", backdropFilter: "blur(8px)" }}
                  onClick={() => navigate(heroIdx === 1 ? "giveaways" : "product-list")}
                >
                  {HERO_SLIDES[heroIdx].cta}
                </button>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-3.5 right-4 flex gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: i === heroIdx ? 16 : 5,
                    height: 5,
                    background: i === heroIdx ? "white" : "hsl(0 0% 100% / 0.25)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reward summary card */}
        <div className="px-4 mt-3.5">
          <motion.div
            className="p-3.5 flex items-center justify-between"
            style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted) / 0.7)", borderRadius: "var(--radius)" }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate("wallet")}
          >
            <div>
              <p className="text-muted-foreground font-medium mb-0.5" style={{ fontSize: 10, letterSpacing: "0.05em" }}>YOUR REWARDS</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold" style={{ fontSize: 26, color: "hsl(var(--accent-dark))", letterSpacing: "-0.03em" }}>
                  {userPoints.toLocaleString()}
                </span>
                <span className="text-muted-foreground font-medium" style={{ fontSize: 13 }}>pts</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={11} style={{ color: "hsl(var(--ledger-credit))" }} />
                <p style={{ fontSize: 11, color: "hsl(var(--ledger-credit))", fontWeight: 500 }}>+340 this week</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground font-medium mb-0.5" style={{ fontSize: 10, letterSpacing: "0.05em" }}>ENTRIES</p>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="font-semibold" style={{ fontSize: 26, color: "hsl(var(--primary))", letterSpacing: "-0.03em" }}>
                  {userEntries}
                </span>
              </div>
              <span className="text-primary font-medium flex items-center gap-0.5 ml-auto justify-end" style={{ fontSize: 12 }}>
                View wallet <ChevronRight size={12} />
              </span>
            </div>
          </motion.div>
        </div>

        {/* Giveaway preview */}
        <div className="px-4 mt-3">
          <motion.div
            className="p-3 flex items-center gap-3"
            style={{ background: "hsl(var(--primary-light))", border: "1px solid hsl(var(--primary-muted) / 0.7)", borderRadius: "var(--radius)" }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate("giveaways")}
          >
            <div className="flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ width: 36, height: 36, background: "hsl(var(--primary) / 0.08)" }}>
              <Award size={17} className="text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate" style={{ fontSize: 13 }}>
                10 prizes available — Redeem points now
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 11 }}>From 50 to 1,200 points</p>
            </div>
            <ChevronRight size={15} className="text-primary flex-shrink-0" />
          </motion.div>
        </div>

        {/* Categories */}
        <div className="mt-5 px-4">
          <div className="section-header">
            <span className="section-title">Categories</span>
            <button className="section-link" onClick={() => navigate("product-list")}>All</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.label}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
                onClick={() => navigate("product-list")}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.1 }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ width: 52, height: 52, background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.7)", fontSize: 21, borderRadius: "var(--radius)" }}
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
                style={{ width: 172 }}
                onClick={() => navigate("product-detail")}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: 134, objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="p-3">
                  <p className="text-muted-foreground font-medium" style={{ fontSize: 10 }}>{product.brand}</p>
                  <p className="font-medium text-foreground leading-tight mt-0.5" style={{ fontSize: 13 }}>
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star size={10} fill="hsl(var(--accent))" stroke="none" />
                    <span style={{ fontSize: 11, color: "hsl(var(--accent-dark))", fontWeight: 500 }}>{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-semibold text-foreground" style={{ fontSize: 15 }}>${product.price}</span>
                      <span className="text-muted-foreground line-through ml-1.5" style={{ fontSize: 11 }}>${product.originalPrice}</span>
                    </div>
                    <span
                      className="font-semibold"
                      style={{ background: "hsl(var(--secondary-light))", color: "hsl(var(--secondary))", fontSize: 10, padding: "2px 6px", borderRadius: "var(--radius-sm)" }}
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
          <div className="flex flex-col gap-2.5">
            {DEALS.map((product) => (
              <motion.button
                key={product.id}
                className="product-card flex items-center gap-3 p-3"
                onClick={() => navigate("product-detail")}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.1 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 70, height: 70, objectFit: "cover", borderRadius: "var(--radius-sm)" }}
                  loading="lazy"
                />
                <div className="flex-1 text-left">
                  <p className="text-muted-foreground font-medium" style={{ fontSize: 10 }}>{product.brand}</p>
                  <p className="font-medium text-foreground leading-tight mt-0.5" style={{ fontSize: 13 }}>
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={10} fill="hsl(var(--accent))" stroke="none" />
                    <span style={{ fontSize: 11, color: "hsl(var(--accent-dark))", fontWeight: 500 }}>{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-semibold text-foreground" style={{ fontSize: 15 }}>${product.price}</span>
                    <span className="text-muted-foreground line-through" style={{ fontSize: 11 }}>${product.originalPrice}</span>
                    <div className="reward-badge">+{product.points} pts</div>
                  </div>
                </div>
                <span
                  className="font-semibold self-start mt-1"
                  style={{ background: "hsl(var(--secondary-light))", color: "hsl(var(--secondary))", fontSize: 10, padding: "2px 6px", borderRadius: "var(--radius-sm)" }}
                >
                  -{product.discount}%
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};
