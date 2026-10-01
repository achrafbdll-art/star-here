import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastNotificationProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border text-sm font-medium backdrop-blur-md ${
              toast.type === "success"
                ? "bg-[#0C0F17]/95 border-[#B38B4D]/60 text-white"
                : toast.type === "error"
                ? "bg-red-950/95 border-red-500/50 text-white"
                : "bg-stone-900/95 border-stone-700 text-stone-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-[#B38B4D] shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="ml-3 text-stone-400 hover:text-white transition-colors"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
