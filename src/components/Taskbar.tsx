'use client';

import React from 'react';
import { Terminal, Folder, Briefcase, Mail, Settings, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWindowManager } from '@/context/WindowContext';

// Define the structure for the dock items
interface DockItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const dockItems: DockItem[] = [
  { id: 'grid', name: 'Applications', icon: <LayoutGrid size={24} />, color: 'text-pop-accent' },
  { id: 'terminal', name: 'Tech Stack', icon: <Terminal size={24} />, color: 'text-green-400' },
  { id: 'explorer', name: 'Projects', icon: <Folder size={24} />, color: 'text-yellow-400' },
  { id: 'resume', name: 'Resume/About', icon: <Briefcase size={24} />, color: 'text-red-400' },
  { id: 'contact', name: 'Contact', icon: <Mail size={24} />, color: 'text-blue-400' },
  { id: 'settings', name: 'System Info', icon: <Settings size={24} />, color: 'text-pop-text-muted' },
];

const DockIcon: React.FC<DockItem> = ({ name, icon, color }) => {
  const { launchApp } = useWindowManager();

  const getAppId = (n: string): string => {
      if (n === 'Tech Stack') return 'terminal';
      if (n === 'Projects') return 'explorer';
      if (n === 'Resume/About') return 'resume';
      if (n === 'Contact') return 'contact';
      if (n === 'System Info') return 'settings';
      if (n === 'Applications') return 'grid';
      return n.toLowerCase().replace(/\s/g, ''); 
  }

  const handleLaunch = () => {
      const appId = getAppId(name);
      launchApp(appId, {
          title: name,
          initialWidth: appId === 'terminal' ? 750 : 850,
          initialHeight: appId === 'explorer' ? 500 : 600,

      });
  };

  return (
    <motion.button
      title={name}
      className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center p-1.5 md:p-2 rounded-xl transition-colors relative focus:outline-none hover:bg-white/10 active:bg-white/20"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      onClick={handleLaunch}
    >
      <div className={`${color} transition-all scale-90 md:scale-100`}>
        {icon}
      </div>
    </motion.button>
  );
};


const Taskbar: React.FC = () => {
  const [time, setTime] = React.useState(new Date());
  const [isVisible, setIsVisible] = React.useState(true);
  const [isHovering, setIsHovering] = React.useState(false);
  const hideTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const { openWindows } = useWindowManager();

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (openWindows.length > 0 && !isHovering) {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 500);
    } else if (openWindows.length === 0) {
      setIsVisible(true);
    }

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [openWindows.length, isHovering]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isNearBottom = e.clientY > window.innerHeight - 80;
      if (isNearBottom && openWindows.length > 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [openWindows.length]);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  
  return (
    <motion.div
      className="z-50"
      style={{ position: 'fixed', bottom: 0, left: '50%', zIndex: 9999, maxWidth: 'calc(100vw - 16px)' }}
      data-testid="taskbar-root"
      animate={{
        x: '-50%',
        y: isVisible ? -8 : 80
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="bg-pop-dark/40 backdrop-blur-3xl rounded-2xl md:rounded-3xl p-1.5 md:p-2.5 shadow-2xl flex items-center space-x-1 md:space-x-2 border border-white/20 transition-all duration-300 overflow-x-auto">
        <div className="flex space-x-0.5 md:space-x-1.5">
          {dockItems.map(item => (
            <DockIcon key={item.id} {...item} />
          ))}
        </div>
        <div className="h-6 md:h-8 w-px bg-white/30 mx-1 md:mx-3"></div>
        <div className="flex items-center px-1 md:px-2">
          <span className="text-pop-text-light font-sans text-xs md:text-sm font-medium opacity-80 whitespace-nowrap">
            {formattedTime}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Taskbar;