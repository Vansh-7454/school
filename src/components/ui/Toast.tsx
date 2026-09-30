"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastItem, "id">) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, message, type = "info", duration = 4500 }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type, duration }]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title: string = "Success") => {
      toast({ message, title, type: "success" });
    },
    [toast]
  );

  const error = useCallback(
    (message: string, title: string = "Notice") => {
      toast({ message, title, type: "error" });
    },
    [toast]
  );

  const info = useCallback(
    (message: string, title: string = "Information") => {
      toast({ message, title, type: "info" });
    },
    [toast]
  );

  const contextValue = useMemo(
    () => ({ toast, success, error, info }),
    [toast, success, error, info]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toast Viewport with Accessible Live Region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3 max-w-md w-full pointer-events-none p-4 sm:p-0"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "pointer-events-auto rounded-2xl p-4 shadow-2xl backdrop-blur-xl border flex items-start gap-3.5 select-none",
                t.type === "success" && "bg-[#0B1B3A]/95 border-[#C9A24B]/50 text-white",
                t.type === "error" && "bg-[#1A0B10]/95 border-red-500/40 text-white",
                t.type === "info" && "bg-[#0B1B3A]/95 border-gold-400/30 text-white"
              )}
            >
              {/* Type Icon */}
              <div className="shrink-0 mt-0.5">
                {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#C9A24B]" />}
                {t.type === "error" && <AlertCircle className="w-5 h-5 text-red-400" />}
                {t.type === "info" && <Info className="w-5 h-5 text-gold-400" />}
              </div>

              {/* Toast Text */}
              <div className="flex-1 min-w-0 pr-2">
                {t.title && (
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-gold-300 mb-0.5">
                    {t.title}
                  </h4>
                )}
                <p className="text-xs text-white/90 leading-relaxed font-sans">{t.message}</p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                aria-label="Dismiss notification"
                className="shrink-0 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
