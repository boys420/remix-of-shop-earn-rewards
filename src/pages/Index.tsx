import React from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { BottomNav } from "@/components/BottomNav";
import { SplashScreen } from "@/screens/SplashScreen";
import { OnboardingScreen } from "@/screens/OnboardingScreen";
import { AuthScreen } from "@/screens/AuthScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { ProductListScreen } from "@/screens/ProductListScreen";
import { ProductDetailScreen } from "@/screens/ProductDetailScreen";
import { CartScreen } from "@/screens/CartScreen";
import { CheckoutScreen } from "@/screens/CheckoutScreen";
import { OrderSuccessScreen } from "@/screens/OrderSuccessScreen";
import { ContestsScreen } from "@/screens/ContestsScreen";
import { ContestDetailScreen } from "@/screens/ContestDetailScreen";
import { WalletScreen } from "@/screens/WalletScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { GiveawaysScreen } from "@/screens/GiveawaysScreen";
import { MyEntriesScreen } from "@/screens/MyEntriesScreen";
import { motion, AnimatePresence } from "framer-motion";

const ScreenRouter: React.FC = () => {
  const { screen } = useApp();

  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen />;
      case "onboarding": return <OnboardingScreen />;
      case "login": return <AuthScreen initialView="login" />;
      case "signup": return <AuthScreen initialView="signup" />;
      case "otp": return <AuthScreen initialView="otp" />;
      case "home": return <HomeScreen />;
      case "product-list": return <ProductListScreen />;
      case "product-detail": return <ProductDetailScreen />;
      case "cart": return <CartScreen />;
      case "checkout": return <CheckoutScreen />;
      case "order-success": return <OrderSuccessScreen />;
      case "contests": return <ContestsScreen />;
      case "contest-detail": return <ContestDetailScreen />;
      case "wallet": return <WalletScreen />;
      case "profile": return <ProfileScreen />;
      case "giveaways": return <GiveawaysScreen />;
      case "my-entries": return <MyEntriesScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className="h-full overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -4 }}
          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
};

const AppShell: React.FC = () => {
  return (
    <AppProvider>
      {/* Desktop: centered phone frame */}
      <div
        className="hidden md:flex min-h-screen items-center justify-center"
        style={{ background: "linear-gradient(155deg, hsl(222 28% 8%), hsl(222 22% 14%))" }}
      >
        <div className="flex flex-col items-center gap-6">
          <div
            className="relative overflow-hidden bg-background"
            style={{
              width: 390,
              height: 844,
              borderRadius: 44,
              boxShadow:
                "0 0 0 1.5px hsl(222 22% 22%), 0 0 0 6px hsl(222 22% 8%), 0 40px 120px 0 hsl(222 25% 4% / 0.85), 0 0 80px 0 hsl(222 62% 40% / 0.05)",
            }}
          >
            {/* Notch */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
              style={{
                width: 126, height: 34,
                background: "hsl(222 25% 6%)",
                borderRadius: "0 0 20px 20px",
              }}
            />
            <ScreenRouter />
          </div>

          <p style={{ color: "hsl(0 0% 100% / 0.2)", fontSize: 12, fontWeight: 500, letterSpacing: "0.03em" }}>
            RegalShop · UX Prototype
          </p>
        </div>
      </div>

      {/* Mobile: full screen */}
      <div className="md:hidden h-screen overflow-hidden bg-background">
        <ScreenRouter />
      </div>
    </AppProvider>
  );
};

export default AppShell;
