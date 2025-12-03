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
  const [isMobile, setIsMobile] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMaximized(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const toggleMaximize = () => {
    if (isMobile) return;
    setIsMaximized(prev => !prev);
    if (!isMaximized) {
      setSize({ width: window.innerWidth - 32, height: window.innerHeight - 80 });
    } else {
      setSize({ width: initialWidth, height: initialHeight });
      const centerX = (window.innerWidth - initialWidth) / 2;
      const centerY = (window.innerHeight - initialHeight) / 2;
      setPosition({ x: centerX, y: centerY });
    }
  };

  const transition: Transition = { type: 'spring', damping: 20, stiffness: 300 };

  React.useEffect(() => {
    if (!isMobile) {
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
    }
  }, [isMobile, isMaximized]);

  return (
    <motion.div
      ref={containerRef}
      className={`
        absolute top-0 left-0
        bg-pop-dark border border-pop-light-accent/30 rounded-lg shadow-window
        flex flex-col overflow-hidden
        ${isMaximized || isMobile ? 'w-full h-full rounded-none' : ''}
        ${isMobile ? 'md:rounded-lg' : ''}
      `}
      style={{ ...(style || {}) }}
      drag={!isMaximized && !isMobile}
      dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
      dragMomentum={false}
      transition={transition}
      initial={{ scale: isMobile ? 1 : 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: isMaximized || isMobile ? 0 : position.x,
        y: isMaximized || isMobile ? 0 : position.y,
        width: isMaximized || isMobile ? '100%' : size.width,
        height: isMaximized || isMobile ? '100%' : size.height,
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
          flex items-center justify-between p-2 md:p-2 px-3 md:px-2
          bg-pop-light-accent/20 border-b border-pop-light-accent/30 
          cursor-move touch-none
        "
      >
        <div className="flex items-center space-x-2">
          <span className="text-pop-text-light font-mono text-xs md:text-sm truncate max-w-[200px] md:max-w-none">{title}</span>
        </div>
        <div className="flex space-x-1">
          {!isMobile && (
            <button className="p-1 hover:bg-pop-text-muted/10 rounded transition hidden md:block">
              <Minus size={16} className="text-pop-text-light" />
            </button>
          )}
          {!isMobile && (
            <button 
              onClick={toggleMaximize}
              className="p-1 hover:bg-pop-text-muted/10 rounded transition hidden md:block"
            >
              {isMaximized ? <Square size={16} className="text-pop-accent" /> : <Maximize size={16} className="text-pop-accent" />}
            </button>
          )}
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
      <div className="flex-grow p-2 md:p-4 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default WindowFrame;