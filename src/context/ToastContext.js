import React, { createContext, useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random();
    setToasts((all) => [...all, { id, message, type: "success", ...options }]);
    setTimeout(() => setToasts((all) => all.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg"
          >
            {t.type === "error" ? (
              <FaExclamationCircle className="text-red-400" />
            ) : (
              <FaCheckCircle className="text-brand-400" />
            )}
            <span>{t.message}</span>
            {t.to && (
              <Link to={t.to} className="font-semibold text-brand-300 underline">
                {t.toLabel || "View"}
              </Link>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
