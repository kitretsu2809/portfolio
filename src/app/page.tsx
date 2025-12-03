'use client';

import React from 'react';
import TerminalApp from '@/components/apps/TerminalApp';
import WindowFrame from '@/components/WindowFrame';
import DesktopIcon from '@/components/DesktopIcon'; // Keeping this for the desktop aesthetic
import { useWindowManager } from '@/context/WindowContext';

export default function HomePage() {
  const { launchApp } = useWindowManager();
  
  React.useEffect(() => {
    launchApp('terminal', { title: 'Terminal - Tech Stack', initialWidth: 750, initialHeight: 500 });
  }, []);

  return (
    <div className="w-full h-full relative">
      <div style={{ zIndex: 20 }} className="relative">
      </div>
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <DesktopIcon 
          title="Terminal" 
          icon="💻" 
          onClick={() => launchApp('terminal', { title: 'Terminal - Tech Stack', initialWidth: 750, initialHeight: 500 })}
        />
        <DesktopIcon 
          title="Projects" 
          icon="📂" 
          onClick={() => launchApp('explorer', { title: 'Projects', initialWidth: 900, initialHeight: 600 })}
        />
        <DesktopIcon 
          title="README.txt" 
          icon="📄" 
          onClick={() => launchApp('resume', { title: 'README / About', initialWidth: 800, initialHeight: 500 })}
        />
      </div>
      
    </div>
  );
}