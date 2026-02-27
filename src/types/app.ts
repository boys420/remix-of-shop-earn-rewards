export type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "signup"
  | "otp"
  | "home"
  | "product-list"
  | "product-detail"
  | "cart"
  | "checkout"
  | "order-success"
  | "contests"
  | "contest-detail"
  | "wallet"
  | "profile"
  | "giveaways"
  | "my-entries";

export interface AppState {
  screen: Screen;
  previousScreen: Screen | null;
  cartCount: number;
  userPoints: number;
  userEntries: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  rewardPoints: number;
  stock: number;
  category: string;
  image: string;
  badge?: string;
}

export interface Contest {
  id: string;
  title: string;
  prize: string;
  prizeValue: number;
  endsAt: string;
  startsAt: string;
  status: "active" | "upcoming" | "joined";
  minEntries: number;
  userEntries: number;
  totalEntries: number;
  requirement: string;
}

export interface Giveaway {
  id: string;
  name: string;
  image: string;
  pointsRequired: number;
  value: string;
  status: "locked" | "eligible" | "entered" | "completed";
  category: string;
}
