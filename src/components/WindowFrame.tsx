'use client';

import React, { useState } from 'react';
import { motion, PanInfo, Transition } from 'framer-motion';
import { Minus, Square, X, Maximize } from 'lucide-react';

interface WindowFrameProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  onClose?: () => void;
  onFocus?: () => void;
  style?: React.CSSProperties;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ 
  id,
  title, 
  children, 
  initialWidth = 600, 
  initialHeight = 400,
  onClose,
  onFocus,
  style
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  // position is the top-left translate values applied to the window (px)
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  // 1. Framer Motion Drag and Resize Setup
  // We use a simple boundary for dragging relative to the window itself.
  const containerRef = React.useRef(null);
  
  const toggleMaximize = () => {
    setIsMaximized(prev => !prev);
    if (!isMaximized) {
      // Set to full screen minus some padding/taskbar space
      setSize({ width: window.innerWidth - 32, height: window.innerHeight - 80 });
    } else {
      setSize({ width: initialWidth, height: initialHeight });
      const centerX = (window.innerWidth - initialWidth) / 2;
      const centerY = (window.innerHeight - initialHeight) / 2;
      setPosition({ x: centerX, y: centerY });
    }
  };

  const transition: Transition = { type: 'spring', damping: 20, stiffness: 300 };

  // compute initial center on mount so window starts centered
  React.useEffect(() => {
    const centerX = (window.innerWidth - initialWidth) / 2;
    const centerY = (window.innerHeight - initialHeight) / 2;
    setPosition({ x: centerX, y: centerY });
    const onResize = () => {
      if (!isMaximized) {
        const cx = (window.innerWidth - size.width) / 2;
        const cy = (window.innerHeight - size.height) / 2;
        setPosition({ x: cx, y: cy });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`
        absolute top-0 left-0
        bg-pop-dark border border-pop-light-accent/30 rounded-lg shadow-window
        flex flex-col overflow-hidden
        ${isMaximized ? 'w-full h-full rounded-none' : ''}
      `}
      style={{ ...(style || {}) }}
      drag={!isMaximized}
      dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
      dragMomentum={false}
      transition={transition}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? '100%' : size.height,
      }}
      
      onDragEnd={(_, info) => {
        setPosition(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }));
      }}
      onMouseDown={() => {
        if (typeof onFocus === 'function') onFocus();
      }}
    >
      <div 
        className="
          flex items-center justify-between p-2 
          bg-pop-light-accent/20 border-b border-pop-light-accent/30 
          cursor-move
        "
      >
        <div className="flex items-center space-x-2">
          <span className="text-pop-text-light font-mono text-sm">{title}</span>
        </div>
        <div className="flex space-x-1">
          <button className="p-1 hover:bg-pop-text-muted/10 rounded transition">
            <Minus size={16} className="text-pop-text-light" />
          </button>
          <button 
            onClick={toggleMaximize}
            className="p-1 hover:bg-pop-text-muted/10 rounded transition"
          >
            {isMaximized ? <Square size={16} className="text-pop-accent" /> : <Maximize size={16} className="text-pop-accent" />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (typeof onClose === 'function') onClose();
            }}
            className="p-1 hover:bg-red-600/50 rounded transition"
          >
            <X size={16} className="text-red-400" />
          </button>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default WindowFrame;