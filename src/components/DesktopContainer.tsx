"use client";
// src/components/DesktopContainer.tsx

import React from 'react';
import { createPortal } from 'react-dom';
import Taskbar from './Taskbar';
import WindowFrame from './WindowFrame';
import TerminalApp from './apps/TerminalApp';
import FileExplorerApp from './apps/FileExplorerApp';
import { useWindowManager } from '@/context/WindowContext';
import ResumeApp from './apps/ResumeApp';
import ContactApp from './apps/ContactApp';
import SystemInfoApp from './apps/SystemInfoApp';
import ApplicationsApp from './apps/ApplicationsApp';

// We'll use a simple background image/pattern later, for now, just the class.

interface DesktopContainerProps {
  children: React.ReactNode;
}

const DesktopContainer: React.FC<DesktopContainerProps> = ({ children }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { openWindows, closeWindow, focusWindow } = useWindowManager();

  // Auto-apply a default wallpaper if the user drops a file at public/wallpapers/wallpaper.jpg
  React.useEffect(() => {
    // This will work only in the browser — don't run on the server
    if (typeof window === 'undefined') return;

    // Try a quick HEAD fetch to see if the common file name exists
    fetch('/wallpapers/wallpaper.jpg', { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          // Set CSS custom property so our CSS will use it for background-image
          document.documentElement.style.setProperty('--desktop-wallpaper', "url('/wallpapers/wallpaper.jpg')");
        }
      })
      .catch(() => {
        // ignore failures — default color will be used
      });
  }, []);

  const renderAppById = (id: string) => {
    switch (id) {
      case 'terminal':
        return <TerminalApp />;
      // Other app placeholders until implemented
      case 'explorer':
        return <FileExplorerApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
      case 'settings':
        return <SystemInfoApp />;
      case 'grid':
        return <ApplicationsApp />;
      default:
        return <div className="p-4">Unknown app</div>;
    }
  };

  return (
    <div className="desktop-surface h-screen w-screen relative bg-pop-dark overflow-hidden">
      <main className="w-full h-full relative p-0 md:p-4 pb-16 md:pb-28 z-10">
        {children}

        {/* Render open windows from the Window Manager */}
        {openWindows.map((w) => (
          <WindowFrame
            key={w.id}
            id={w.id}
            title={w.title}
            initialWidth={w.initialWidth}
            initialHeight={w.initialHeight}
            onClose={() => closeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            style={{ zIndex: w.zIndex }}
          >
            {renderAppById(w.id)}
          </WindowFrame>
        ))}
      </main>

      {isMounted && createPortal(<Taskbar />, document.body)}
    </div>
  );
};  

export default DesktopContainer;