'use client';

import React from 'react';

const ResumeApp: React.FC = () => {
  return (
    <div className="w-full h-full p-6 text-pop-text-light overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-pop-accent mb-2">About / Resume</h1>
      <p className="text-pop-text-muted/90 mb-6">Hi — I'm a developer creating delightful web experiences. This demo site shows a portfolio built as a desktop-like environment.</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-pop-text-light">Experience</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-sm text-pop-text-muted/90 space-y-1">
          <li>Frontend Engineer — modern React + Next.js applications</li>
          <li>UI/UX-focused implementations with Tailwind and Framer Motion</li>
          <li>Full-stack familiarity: Node, databases, APIs</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-pop-text-light">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind', 'Framer Motion', 'Node.js', 'CSS'].map(skill => (
            <span key={skill} className="bg-pop-light-accent/10 text-pop-light-accent text-xs px-3 py-1 rounded-full font-mono">{skill}</span>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-pop-text-light">Education</h2>
        <p className="text-pop-text-muted/90 text-sm mt-2">Self-taught and continuously learning — strong focus on modern web stacks, performance, and developer experience.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-pop-text-light">Links</h2>
        <div className="flex gap-3 mt-3">
          <a href="#" className="px-3 py-1 rounded border border-pop-accent text-pop-accent hover:bg-pop-accent/10">GitHub</a>
          <a href="#" className="px-3 py-1 rounded border border-pop-accent text-pop-accent hover:bg-pop-accent/10">LinkedIn</a>
          <a href="#" className="px-3 py-1 rounded border border-pop-accent text-pop-accent hover:bg-pop-accent/10">WhatsApp</a>
        </div>
      </section>
    </div>
  );
};

export default ResumeApp;
