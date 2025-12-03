'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  onFinish?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 25, onFinish }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      return () => clearTimeout(timer);
    } else if (onFinish) {
      onFinish();
    }
  }, [currentIndex, text, delay, onFinish]);

  return (
    <span className="whitespace-pre-wrap">
      {displayText}
      {currentIndex < text.length && (
        <span 
          className="animate-blink" 
        >
          |
        </span>
      )}
    </span>
  );
};

export default Typewriter;