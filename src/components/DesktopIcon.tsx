"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  title: string;
  icon: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onClick }) => {
  return (
    <motion.button 
      onClick={onClick}
      className="
        flex flex-col items-center justify-start 
        w-20 h-24 p-2 m-2 
        rounded-lg 
        transition-colors duration-200
        focus:outline-none 
      "
      whileHover={{ backgroundColor: 'rgba(72, 69, 163, 0.3)', scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <span className="text-4xl leading-none mb-1 select-none">
        {icon}
      </span>
      <span className="
        text-pop-text-light text-xs font-sans text-center 
        mt-1 p-0.5 rounded
        bg-black/30
        truncate w-full
      ">
        {title}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;