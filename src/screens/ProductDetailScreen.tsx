import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { ChevronLeft, Star, ShoppingBag, Heart, Share2, CheckCircle, Sparkles } from "lucide-react";

const IMAGES = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
];

export const ProductDetailScreen: React.FC = () => {
  const { navigate, addToCart } = useApp();
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = () => {
    addToCart();
    navigate("cart");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-background">
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 88 }}>
        {/* Image carousel */}
        <div className="relative bg-card" style={{ height: 300 }}>
          <motion.img
            key={imgIdx}
            src={IMAGES[imgIdx]}
            alt="Product"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
            <motion.button
              className="flex items-center justify-center rounded-full bg-card"
              style={{ width: 36, height: 36, boxShadow: "var(--shadow-card)" }}
              onClick={() => navigate("product-list")}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronLeft size={20} strokeWidth={1.6} />
            </motion.button>
            <div className="flex gap-2">
              <motion.button
                className="flex items-center justify-center rounded-full bg-card"
                style={{ width: 36, height: 36, boxShadow: "var(--shadow-card)" }}
                onClick={() => setWishlisted(!wishlisted)}
                whileTap={{ scale: 0.92 }}
              >
                <Heart size={17} strokeWidth={1.6} fill={wishlisted ? "hsl(var(--secondary))" : "none"} stroke={wishlisted ? "hsl(var(--secondary))" : "currentColor"} />
              </motion.button>
              <motion.button
                className="flex items-center justify-center rounded-full bg-card"
                style={{ width: 36, height: 36, boxShadow: "var(--shadow-card)" }}
                whileTap={{ scale: 0.92 }}
              >
                <Share2 size={17} strokeWidth={1.6} />
              </motion.button>
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                className="rounded-full"
                style={{
                  width: i === imgIdx ? 16 : 5,
                  height: 5,
                  background: i === imgIdx ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.5)",
                  transition: "all 0.25s ease",
                }}
                onClick={() => setImgIdx(i)}
              />
            ))}
          </div>

          <div
            className="absolute top-3 right-20 rounded-full font-semibold px-2.5 py-1"
            style={{ background: "hsl(var(--secondary))", color: "white", fontSize: 11 }}
          >
            -20%
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 px-4 pt-3">
          {IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              style={{
                width: 52, height: 52, borderRadius: 8, overflow: "hidden",
                border: i === imgIdx ? "2px solid hsl(var(--primary))" : "1px solid hsl(var(--border))",
              }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>

        {/* Product info */}
        <div className="px-4 pt-4">
          <p className="text-muted-foreground font-medium" style={{ fontSize: 11 }}>SONY · ELECTRONICS</p>
          <h1 className="font-semibold mt-0.5 leading-tight" style={{ fontSize: 19, letterSpacing: "-0.01em" }}>
            Sony WH-1000XM5 Wireless Headphones
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={13} fill="hsl(var(--accent))" stroke="none" />
              ))}
            </div>
            <span className="font-medium" style={{ fontSize: 13 }}>4.8</span>
            <span className="text-muted-foreground" style={{ fontSize: 13 }}>(2,341 reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <span className="font-semibold" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>$279</span>
            <span className="text-muted-foreground line-through" style={{ fontSize: 16 }}>$349</span>
            <span
              className="rounded-md font-medium px-2 py-0.5"
              style={{ background: "hsl(var(--secondary-light))", color: "hsl(var(--secondary))", fontSize: 12 }}
            >
              Save $70
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <CheckCircle size={14} strokeWidth={1.6} style={{ color: "hsl(var(--ledger-credit))" }} />
            <span style={{ fontSize: 13, color: "hsl(var(--ledger-credit))", fontWeight: 500 }}>In stock — 12 units left</span>
          </div>

          {/* Reward info */}
          <div
            className="mt-3 p-3 rounded-lg flex items-center gap-3"
            style={{ background: "hsl(var(--ivory))", border: "1px solid hsl(var(--accent-muted))" }}
          >
            <div
              className="flex items-center justify-center rounded-md flex-shrink-0"
              style={{ width: 34, height: 34, background: "hsl(var(--accent-light))" }}
            >
              <Sparkles size={15} style={{ color: "hsl(var(--accent-dark))" }} />
            </div>
            <div>
              <p className="font-medium" style={{ fontSize: 13 }}>
                Earn <span style={{ color: "hsl(var(--accent-dark))" }}>+139 points</span> on this purchase
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 11 }}>
                Points credited within 24h of delivery
              </p>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-4">
            <span className="font-medium" style={{ fontSize: 14 }}>Quantity</span>
            <div className="flex items-center gap-3">
              <motion.button
                className="flex items-center justify-center rounded-md border bg-muted"
                style={{ width: 32, height: 32, fontSize: 18, borderColor: "hsl(var(--border))" }}
                onClick={() => setQty(Math.max(1, qty - 1))}
                whileTap={{ scale: 0.92 }}
              >
                −
              </motion.button>
              <span className="font-semibold" style={{ fontSize: 16, minWidth: 20, textAlign: "center" }}>{qty}</span>
              <motion.button
                className="flex items-center justify-center rounded-md border bg-muted"
                style={{ width: 32, height: 32, fontSize: 18, borderColor: "hsl(var(--border))" }}
                onClick={() => setQty(qty + 1)}
                whileTap={{ scale: 0.92 }}
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="font-semibold mb-1.5" style={{ fontSize: 14 }}>About this product</h3>
            <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 13 }}>
              Industry-leading noise cancellation with Auto NC Optimizer. Up to 30 hours battery life with quick charge. Multipoint connection to two devices simultaneously.
            </p>
          </div>

          {/* Specs */}
          <div className="mt-4 rounded-lg overflow-hidden" style={{ border: "1px solid hsl(var(--border))" }}>
            {[
              ["Driver Unit", "30 mm"],
              ["Frequency Response", "4–40,000 Hz"],
              ["Battery Life", "30 hrs (NC on)"],
              ["Weight", "250 g"],
              ["Connectivity", "Bluetooth 5.2"],
            ].map(([key, val]) => (
              <div key={key} className="flex justify-between px-3.5 py-2.5" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>{key}</span>
                <span className="font-medium" style={{ fontSize: 13 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sticky-cta">
        <div className="flex gap-3">
          <motion.button
            className="flex items-center justify-center rounded-lg border bg-muted"
            style={{ width: 48, height: 48, borderColor: "hsl(var(--border))" }}
            onClick={() => navigate("cart")}
            whileTap={{ scale: 0.92 }}
          >
            <ShoppingBag size={19} strokeWidth={1.6} />
          </motion.button>
          <motion.button
            className="btn-primary flex-1"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart — $279
          </motion.button>
        </div>
      </div>
    </div>
  );
};
