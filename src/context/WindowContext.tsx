"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WindowProps {
  id: string; // e.g., 'terminal', 'explorer'
  title: string;
  zIndex: number;
  initialWidth: number;
  initialHeight: number;
}

interface WindowContextType {
  openWindows: WindowProps[];
  launchApp: (id: string, options: Omit<WindowProps, 'id' | 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

interface WindowProviderProps {
  children: ReactNode;
}

export const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
  const [openWindows, setOpenWindows] = useState<WindowProps[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);
  const recentlyClosedRef = React.useRef<Record<string, number>>({});
  const RECENTLY_CLOSED_MS = 600;

  const focusWindow = useCallback((id: string) => {
    console.debug('[WindowContext] focusWindow', id);
    setOpenWindows(prevWindows => {
      const exists = prevWindows.find(w => w.id === id);
      if (!exists) return prevWindows;

      const currentMax = prevWindows.reduce((m, w) => Math.max(m, w.zIndex), 0);
      const nextZ = currentMax + 1;

      const next = prevWindows.map(w => w.id === id ? { ...w, zIndex: nextZ } : w);

      setMaxZIndex(nextZ);

      return next;
    });
  }, []);

  const launchApp = useCallback((id: string, options: Omit<WindowProps, 'id' | 'zIndex'>) => {
    const lastClosed = recentlyClosedRef.current[id];
    if (lastClosed && (Date.now() - lastClosed) < RECENTLY_CLOSED_MS) {
      console.debug('[WindowContext] Ignoring launchApp for', id, 'closed', Date.now() - lastClosed, 'ms ago');
      return;
    }

    console.debug(`[WindowContext] launchApp ${id}`, { options, lastClosed: recentlyClosedRef.current[id], now: Date.now() });

    setOpenWindows(prevWindows => {
      const exists = prevWindows.find(w => w.id === id);
      if (exists) {
        const currentMax = prevWindows.reduce((m, w) => Math.max(m, w.zIndex), 0);
        const nextZ = currentMax + 1;
        setMaxZIndex(nextZ);
        return prevWindows.map(w => w.id === id ? { ...w, zIndex: nextZ } : w);
      }

      const currentMax = prevWindows.reduce((m, w) => Math.max(m, w.zIndex), 0);
      const newZ = currentMax + 1;
      setMaxZIndex(newZ);

      const newWindow: WindowProps = {
        id,
        title: options.title,
        initialWidth: options.initialWidth,
        initialHeight: options.initialHeight,
        zIndex: newZ,
      };

      return [...prevWindows, newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    console.debug('[WindowContext] closeWindow', id);
    recentlyClosedRef.current[id] = Date.now();
    setTimeout(() => {
      delete recentlyClosedRef.current[id];
    }, RECENTLY_CLOSED_MS + 1000);

    setOpenWindows(prevWindows => prevWindows.filter(window => window.id !== id));
  }, []);

  return (
    <WindowContext.Provider value={{ openWindows, launchApp, closeWindow, focusWindow }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindowManager must be used within a WindowProvider');
  }
  return context;
};