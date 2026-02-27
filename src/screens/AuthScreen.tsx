import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { ChevronLeft, Eye, EyeOff, Shield } from "lucide-react";

type AuthView = "login" | "signup" | "otp";

export const AuthScreen: React.FC<{ initialView?: AuthView }> = ({ initialView = "login" }) => {
  const { navigate } = useApp();
  const [view, setView] = useState<AuthView>(initialView);
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (val: string, i: number) => {
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-5 pt-6 pb-4">
        {view !== "login" && (
          <motion.button
            className="flex items-center gap-1 text-muted-foreground mb-4"
            style={{ fontSize: 13 }}
            onClick={() => setView(view === "otp" ? "signup" : "login")}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={16} strokeWidth={1.7} /> Back
          </motion.button>
        )}
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: "hsl(var(--primary-dark))" }}>
            <svg width="18" height="18" viewBox="0 0 38 38" fill="none">
              <rect x="5" y="14" width="28" height="20" rx="3" fill="white" opacity="0.9" />
              <path d="M12 14v-3a7 7 0 0 1 14 0v3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="19" cy="24" r="3" fill="hsl(221 71% 30%)" />
            </svg>
          </div>
          <span className="font-bold text-foreground" style={{ fontSize: 17 }}>RegalShop</span>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-y-auto">
        {view === "login" && (
          <motion.div className="flex flex-col gap-5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div>
              <h1 className="font-bold mb-1" style={{ fontSize: 24, letterSpacing: "-0.02em" }}>Sign in</h1>
              <p className="text-muted-foreground" style={{ fontSize: 13 }}>Enter your credentials to continue</p>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block font-medium mb-1.5" style={{ fontSize: 13 }}>Email address</label>
                <input className="field-input" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block font-medium mb-1.5" style={{ fontSize: 13 }}>Password</label>
                <div className="relative">
                  <input className="field-input pr-11" type={showPass ? "text" : "password"} placeholder="••••••••" />
                  <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} strokeWidth={1.7} /> : <Eye size={16} strokeWidth={1.7} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="text-primary font-medium" style={{ fontSize: 13 }}>Forgot password?</button>
              </div>
            </div>
            <motion.button className="btn-primary" onClick={() => navigate("home")} whileTap={{ scale: 0.97 }}>Sign In</motion.button>
            <div className="relative flex items-center gap-3">
              <div className="flex-1" style={{ borderTop: "1px solid hsl(var(--border))" }} />
              <span className="text-muted-foreground" style={{ fontSize: 12 }}>or continue with</span>
              <div className="flex-1" style={{ borderTop: "1px solid hsl(var(--border))" }} />
            </div>
            <motion.button className="btn-secondary flex items-center gap-3" whileTap={{ scale: 0.97 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2a10.3 10.3 0 0 0-.164-1.84H9v3.481h4.844A4.14 4.14 0 0 1 12.077 13.1v1.936h2.902c1.697-1.563 2.661-3.866 2.661-6.637z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.902-2.254C11.25 14.237 10.198 14.5 9 14.5c-3.33 0-5.507-2.21-6.42-5.19H.57v2.328A9 9 0 0 0 9 18z" fill="#34A853"/>
                <path d="M2.58 9.31A5.408 5.408 0 0 1 2.3 7.5c0-.628.108-1.24.28-1.81V3.362H.57A9.001 9.001 0 0 0 0 7.5c0 1.453.348 2.828.57 3.637l2.01-1.827z" fill="#FBBC05"/>
                <path d="M9 3.5c1.322 0 2.508.455 3.441 1.345l2.582-2.582C13.463.891 11.43 0 9 0A9 9 0 0 0 .57 3.362l2.01 1.828C3.493 2.71 5.67.5 9 3.5z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </motion.button>
            <p className="text-center text-muted-foreground" style={{ fontSize: 13 }}>
              Don't have an account?{" "}
              <button className="text-primary font-medium" onClick={() => setView("signup")}>Create one</button>
            </p>
          </motion.div>
        )}

        {view === "signup" && (
          <motion.div className="flex flex-col gap-5" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
            <div>
              <h1 className="font-bold mb-1" style={{ fontSize: 24, letterSpacing: "-0.02em" }}>Create account</h1>
              <p className="text-muted-foreground" style={{ fontSize: 13 }}>Fill in your details to get started</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1.5" style={{ fontSize: 13 }}>First name</label>
                  <input className="field-input" placeholder="Alex" />
                </div>
                <div>
                  <label className="block font-medium mb-1.5" style={{ fontSize: 13 }}>Last name</label>
                  <input className="field-input" placeholder="Morgan" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1.5" style={{ fontSize: 13 }}>Email address</label>
                <input className="field-input" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block font-medium mb-1.5" style={{ fontSize: 13 }}>Phone number</label>
                <div className="flex gap-2">
                  <div className="field-input flex items-center gap-1.5 font-medium" style={{ width: 72, flexShrink: 0, fontSize: 14 }}>🇺🇸 +1</div>
                  <input className="field-input flex-1" type="tel" placeholder="(555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1.5" style={{ fontSize: 13 }}>Password</label>
                <input className="field-input" type="password" placeholder="Min. 8 characters" />
              </div>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 12 }}>
              By creating an account you agree to our <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>.
            </p>
            <motion.button className="btn-primary" onClick={() => setView("otp")} whileTap={{ scale: 0.97 }}>Create Account</motion.button>
            <p className="text-center text-muted-foreground" style={{ fontSize: 13 }}>
              Already have an account?{" "}
              <button className="text-primary font-medium" onClick={() => setView("login")}>Sign in</button>
            </p>
          </motion.div>
        )}

        {view === "otp" && (
          <motion.div className="flex flex-col gap-6" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "hsl(var(--primary-light))" }}>
              <Shield size={18} strokeWidth={1.7} className="text-primary flex-shrink-0" />
              <p style={{ fontSize: 13 }}>We sent a 6-digit code to <strong>you@example.com</strong></p>
            </div>
            <div>
              <h1 className="font-bold mb-1" style={{ fontSize: 24, letterSpacing: "-0.02em" }}>Verify your email</h1>
              <p className="text-muted-foreground" style={{ fontSize: 13 }}>Enter the code to confirm your identity</p>
            </div>
            <div className="flex gap-2 justify-between">
              {otp.map((val, i) => (
                <input
                  key={i}
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="text-center font-bold rounded-xl"
                  style={{
                    width: 48, height: 56, fontSize: 22,
                    background: "hsl(var(--muted))",
                    border: `1.5px solid ${val ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                    color: "hsl(var(--foreground))",
                    outline: "none",
                  }}
                />
              ))}
            </div>
            <motion.button className="btn-primary" onClick={() => navigate("home")} whileTap={{ scale: 0.97 }}>Verify & Continue</motion.button>
            <div className="text-center">
              <p className="text-muted-foreground" style={{ fontSize: 13 }}>
                Didn't receive the code?{" "}
                <button className="text-primary font-medium">Resend in 0:42</button>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
