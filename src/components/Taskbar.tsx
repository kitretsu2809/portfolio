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
      className="h-12 w-12 flex items-center justify-center p-2 rounded-xl transition-colors relative focus:outline-none hover:bg-white/10"
      whileHover={{ scale: 1.3 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      onClick={handleLaunch}
    >
      <div className={`${color} transition-all`}>
        {icon}
      </div>
    </motion.button>
  );
};


const Taskbar: React.FC = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  
  return (
    <div
      className="z-50"
      style={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
      data-testid="taskbar-root"
    >
      <div className="bg-pop-dark/40 backdrop-blur-3xl rounded-3xl p-2.5 shadow-2xl flex items-center space-x-2 border border-white/20 transition-all duration-300">
        <div className="flex space-x-1.5">
          {dockItems.map(item => (
            <DockIcon key={item.id} {...item} />
          ))}
        </div>
        <div className="h-8 w-px bg-white/30 mx-3"></div>
        <div className="flex items-center px-2">
          <span className="text-pop-text-light font-sans text-sm font-medium opacity-80">
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;