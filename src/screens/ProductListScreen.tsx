import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star, ChevronDown, Sparkles } from "lucide-react";

const PRODUCTS = [
  { id: "p1", name: "Sony WH-1000XM5", brand: "Sony", price: 279, originalPrice: 349, discount: 20, rating: 4.8, reviews: 2341, points: 139, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", inStock: true },
  { id: "p2", name: "Nike Air Zoom Pegasus 40", brand: "Nike", price: 118, originalPrice: 140, discount: 16, rating: 4.6, reviews: 984, points: 59, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", inStock: true },
  { id: "p3", name: "Kindle Paperwhite (16 GB)", brand: "Amazon", price: 119, originalPrice: 149, discount: 20, rating: 4.7, reviews: 5812, points: 60, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop", inStock: true },
  { id: "p4", name: "Levi's 511 Slim Jeans", brand: "Levi's", price: 59, originalPrice: 79, discount: 25, rating: 4.5, reviews: 1220, points: 30, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop", inStock: true },
  { id: "p5", name: "Apple AirPods Pro (2nd gen)", brand: "Apple", price: 199, originalPrice: 249, discount: 20, rating: 4.9, reviews: 8420, points: 100, image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=200&h=200&fit=crop", inStock: false },
  { id: "p6", name: "Instant Pot Duo 7-in-1", brand: "Instant Pot", price: 79, originalPrice: 99, discount: 20, rating: 4.7, reviews: 3891, points: 40, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=200&h=200&fit=crop", inStock: true },
];

const FILTERS = ["All", "Electronics", "Clothing", "Home", "Books", "Sports"];
const SORTS = ["Relevance", "Price: Low–High", "Price: High–Low", "Best Rated", "Most Reviews"];

export const ProductListScreen: React.FC = () => {
  const { navigate } = useApp();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showSort, setShowSort] = useState(false);
  const [sortIdx, setSortIdx] = useState(0);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="status-bar bg-background" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex items-center gap-1 text-xs">●●●</div>
      </div>

      <div className="px-4 pt-2 pb-3 bg-card" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <h1 className="font-bold mb-3" style={{ fontSize: 20, letterSpacing: "-0.02em" }}>Shop</h1>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2.5 bg-muted" style={{ border: "1px solid hsl(var(--border))" }}>
            <Search size={15} strokeWidth={1.7} className="text-muted-foreground" />
            <span className="text-muted-foreground" style={{ fontSize: 14 }}>Search products...</span>
          </div>
          <motion.button
            className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 bg-muted"
            style={{ border: "1px solid hsl(var(--border))" }}
            onClick={() => setShowSort(!showSort)}
            whileTap={{ scale: 0.93 }}
          >
            <SlidersHorizontal size={15} strokeWidth={1.7} />
          </motion.button>
        </div>

        {showSort && (
          <div className="absolute left-4 right-4 bg-card rounded-xl mt-2 z-50 overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)", top: 150, border: "1px solid hsl(var(--border))" }}>
            {SORTS.map((s, i) => (
              <button
                key={s}
                className="w-full text-left px-4 py-3"
                style={{ fontSize: 14, fontWeight: i === sortIdx ? 600 : 400, color: i === sortIdx ? "hsl(var(--primary))" : "hsl(var(--foreground))", borderBottom: "1px solid hsl(var(--border))" }}
                onClick={() => { setSortIdx(i); setShowSort(false); }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 px-4 py-2.5 bg-card overflow-x-auto" style={{ scrollbarWidth: "none", borderBottom: "1px solid hsl(var(--border))" }}>
        {FILTERS.map((f) => (
          <button key={f} className={activeFilter === f ? "chip-active" : "chip-outline"} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        <div className="px-4 py-2.5 flex items-center justify-between">
          <span className="text-muted-foreground" style={{ fontSize: 12 }}>Showing {PRODUCTS.length} results</span>
          <button className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: 12 }} onClick={() => setShowSort(!showSort)}>
            {SORTS[sortIdx]} <ChevronDown size={12} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 px-4">
          {PRODUCTS.map((p, idx) => (
            <motion.button
              key={p.id}
              className="product-card text-left"
              style={{ marginTop: idx % 2 === 1 ? 12 : 0 }}
              onClick={() => navigate("product-detail")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative">
                <img src={p.image} alt={p.name} style={{ width: "100%", height: 130, objectFit: "cover" }} />
                {!p.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "hsl(220 25% 10% / 0.45)" }}>
                    <span className="font-semibold text-white rounded px-2 py-1" style={{ fontSize: 11, background: "hsl(var(--muted-foreground))" }}>Out of stock</span>
                  </div>
                )}
                <span className="absolute top-2 left-2 rounded font-semibold" style={{ background: "hsl(var(--secondary))", color: "white", fontSize: 10, padding: "2px 5px" }}>
                  -{p.discount}%
                </span>
              </div>
              <div className="p-2.5">
                <p className="text-muted-foreground" style={{ fontSize: 10 }}>{p.brand}</p>
                <p className="font-medium leading-tight mt-0.5 line-clamp-2" style={{ fontSize: 12 }}>{p.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={9} fill="hsl(var(--accent))" stroke="none" />
                  <span style={{ fontSize: 10, color: "hsl(var(--accent-dark))" }}>{p.rating}</span>
                  <span className="text-muted-foreground" style={{ fontSize: 10 }}>({p.reviews.toLocaleString()})</span>
                </div>
                <div className="mt-1.5">
                  <span className="font-bold" style={{ fontSize: 14 }}>${p.price}</span>
                  <span className="text-muted-foreground line-through ml-1" style={{ fontSize: 11 }}>${p.originalPrice}</span>
                </div>
                <div className="reward-badge mt-1.5"><Sparkles size={9} /> +{p.points} pts</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
