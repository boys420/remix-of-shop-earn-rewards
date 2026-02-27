import React, { createContext, useContext, useState, useCallback } from "react";
import type { Screen, AppState } from "@/types/app";

interface AppContextType extends AppState {
  navigate: (screen: Screen) => void;
  goBack: () => void;
  addToCart: () => void;
  placeOrder: () => void;
  deductPoints: (amount: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    screen: "splash",
    previousScreen: null,
    cartCount: 2,
    userPoints: 4820,
    userEntries: 7,
  });

  const navigate = useCallback((screen: Screen) => {
    setState((prev) => ({
      ...prev,
      screen,
      previousScreen: prev.screen,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => ({
      ...prev,
      screen: prev.previousScreen || "home",
      previousScreen: null,
    }));
  }, []);

  const addToCart = useCallback(() => {
    setState((prev) => ({ ...prev, cartCount: prev.cartCount + 1 }));
  }, []);

  const placeOrder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      screen: "order-success",
      previousScreen: "checkout",
      cartCount: 0,
      userPoints: prev.userPoints + 340,
      userEntries: prev.userEntries + 2,
    }));
  }, []);

  const deductPoints = useCallback((amount: number) => {
    setState((prev) => ({
      ...prev,
      userPoints: Math.max(0, prev.userPoints - amount),
    }));
  }, []);

  return (
    <AppContext.Provider value={{ ...state, navigate, goBack, addToCart, placeOrder, deductPoints }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
