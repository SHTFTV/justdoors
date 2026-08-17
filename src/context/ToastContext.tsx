import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  X, 
  FileSpreadsheet, 
  Send,
  Building2,
  ExternalLink
} from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  referenceId?: string;
  metadata?: string;
  duration?: number; // duration in ms, default 5500ms
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
  success: (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'title' | 'message'>>) => string;
  info: (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'title' | 'message'>>) => string;
  error: (title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'title' | 'message'>>) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toastData: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastItem = {
      id,
      duration: toastData.duration ?? 6000,
      ...toastData,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const success = useCallback((title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'title' | 'message'>>) => {
    return showToast({
      type: 'success',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  const info = useCallback((title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'title' | 'message'>>) => {
    return showToast({
      type: 'info',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  const error = useCallback((title: string, message?: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'title' | 'message'>>) => {
    return showToast({
      type: 'error',
      title,
      message,
      ...options,
    });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, success, info, error }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <aside 
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </aside>
  );
};

// Satisfying animated check-mark icon for success notifications
const AnimatedSuccessCheckmark: React.FC = () => {
  return (
    <div className="relative shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center">
      {/* Subtle expanding glow pulse */}
      <motion.span
        initial={{ scale: 0.7, opacity: 0.9 }}
        animate={{ scale: 1.65, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-full bg-amber-400/40 pointer-events-none"
      />

      {/* Outer ambient ring */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="absolute inset-0 rounded-full bg-amber-500/15 border border-amber-500/30"
      />

      {/* SVG Animated Circle & Check Path */}
      <motion.svg
        className="w-4 h-4 text-amber-400 relative z-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ scale: 0.6, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 22,
          delay: 0.05,
        }}
      >
        {/* Animated Checkmark Stroke */}
        <motion.path
          d="M5.5 12.5L10 17L19 7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: 0.15, duration: 0.38, ease: [0.16, 1, 0.3, 1] },
            opacity: { delay: 0.12, duration: 0.1 },
          }}
        />
      </motion.svg>
    </div>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const [isPaused, setIsPaused] = useState(false);

  React.useEffect(() => {
    if (!toast.duration || isPaused) return;

    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, isPaused, onDismiss]);

  const getTypeStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: <AnimatedSuccessCheckmark />,
          border: 'border-amber-500/40',
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          glow: 'shadow-amber-500/15',
          progressBg: 'bg-amber-500',
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
          border: 'border-red-500/40',
          badgeBg: 'bg-red-500/10 text-red-300 border-red-500/30',
          glow: 'shadow-red-500/10',
          progressBg: 'bg-red-500',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />,
          border: 'border-amber-400/40',
          badgeBg: 'bg-amber-400/10 text-amber-200 border-amber-400/30',
          glow: 'shadow-amber-400/10',
          progressBg: 'bg-amber-400',
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />,
          border: 'border-sky-500/40',
          badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
          glow: 'shadow-sky-500/10',
          progressBg: 'bg-sky-400',
        };
    }
  };

  const style = getTypeStyles();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`pointer-events-auto rounded-2xl bg-neutral-900/95 backdrop-blur-xl border ${style.border} p-4 text-neutral-100 shadow-2xl ${style.glow} relative overflow-hidden flex flex-col gap-2.5 transition-all`}
    >
      {/* Toast Content Area */}
      <div className="flex items-start gap-3 justify-between">
        <div className="flex items-start gap-3">
          {style.icon}
          <div className="space-y-1">
            <h5 className="text-xs sm:text-sm font-bold text-white leading-tight font-display">
              {toast.title}
            </h5>
            {toast.message && (
              <p className="text-xs text-neutral-300 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => onDismiss(toast.id)}
          className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0 -mr-1 -mt-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Optional Metadata / Reference Badge */}
      {(toast.referenceId || toast.metadata) && (
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-800/80">
          {toast.referenceId && (
            <div className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border ${style.badgeBg} flex items-center gap-1`}>
              <span>Ref:</span>
              <span>{toast.referenceId}</span>
            </div>
          )}
          {toast.metadata && (
            <span className="text-[11px] text-neutral-400 font-mono">
              {toast.metadata}
            </span>
          )}
        </div>
      )}

      {/* Subtle Progress Bar */}
      {toast.duration && toast.duration > 0 && !isPaused && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 h-0.5 ${style.progressBg} opacity-60`}
        />
      )}
    </motion.div>
  );
};
