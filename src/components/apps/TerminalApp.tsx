'use client';

import React, { useState, useEffect, useRef } from 'react';
import Typewriter from '../apps/Typewriter';
import WindowFrame from '../WindowFrame';
import portfolioData from '@/data/portfolio.json';

interface TerminalLine {
  id: number;
  type: 'command' | 'output';
  content: string | string[];
}

const commands: TerminalLine[] = [
  { id: 1, type: 'command', content: 'cat ~/config/tech_stack.txt' },
  { id: 2, type: 'output', content: [
    "╔═══════════════════════════════════════════════════════════╗",
    "║                                                           ║",
    `║  ${portfolioData.personal.name} - ${portfolioData.personal.profession} ║`,
    "║                                                           ║",
    `║  ${portfolioData.personal.tagline}                 ║`,
    "║                                                           ║",
    "╚═══════════════════════════════════════════════════════════╝",
    "",
    "--- CORE STACK ---",
    ...portfolioData.techStack.core,
    "",
    "--- FRONTEND ---",
    ...portfolioData.techStack.frontend,
    "",
    "--- BACKEND/FULLSTACK ---",
    ...portfolioData.techStack.backend,
    "",
    "Type 'help' for available commands."
  ]},
];

const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState(true); // Control for the initial typewriter effect
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commands.length > 0) {
      setHistory([commands[0]]);
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    setHistory(prev => [...prev, { id: Date.now(), type: 'command', content: cmd }]);
    
    if (cmd.toLowerCase() === 'help') {
        setHistory(prev => [...prev, { id: Date.now() + 1, type: 'output', content: "Available commands: cat, ls, clear, projects" }]);
    } else {
        setHistory(prev => [...prev, { id: Date.now() + 1, type: 'output', content: `Error: command not found: ${cmd}` }]);
    }
    
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="font-mono text-sm bg-black p-4 h-full w-full overflow-hidden text-terminal-green">
      <div 
        ref={terminalRef} 
        className="h-[calc(100%-2rem)] overflow-y-auto pr-2"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="mb-4 text-sm text-pop-accent font-semibold">
          Welcome to devOS v1.0. (c) 2025. Running on Next.js/Tailwind.
        </div>
        {history.map((line, index) => (
          <div key={line.id} className="mb-0.5">
            {line.type === 'command' ? (
              <span className="whitespace-pre-wrap">
                <span className="text-pop-light-accent font-bold">$ </span>
                {index === 0 && isTyping ? (
                  <Typewriter 
                    text={line.content as string} 
                    onFinish={() => {
                        setIsTyping(false);
                        setHistory(prev => [...prev, commands[1]]);
                    }}
                  />
                ) : (
                  line.content
                )}
              </span>
            ) : (
              <div className="text-terminal-green/90 leading-relaxed">
                {Array.isArray(line.content) ? line.content.map((text, i) => (
                  <p key={i} className="my-0">
                    {index === 1 && line.type === 'output' ? (
                      <Typewriter text={text} delay={50} />
                    ) : (
                      text
                    )}
                  </p>
                )) : (
                    <p>{line.content}</p>
                )}
              </div>
            )}
          </div>
        ))}
        {!isTyping && (
          <div className="flex items-center mt-2">
            <span className="text-pop-light-accent font-bold">$ </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent border-none outline-none ml-2 text-terminal-green caret-terminal-green"
              autoFocus
            />
          </div>
        )}
      </div>
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TerminalApp;