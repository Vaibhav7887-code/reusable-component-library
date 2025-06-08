'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastProps } from '@/components/ui/toast';
import { AnimatePresence } from 'framer-motion';

type ToastOptions = Omit<ToastProps, 'onClose'>;

interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastMessage extends Omit<ToastOptions, 'id'> {
  id: string;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = (options: ToastOptions) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { ...options, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toastProps) => (
            <Toast key={toastProps.id} {...toastProps} onClose={() => removeToast(toastProps.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
