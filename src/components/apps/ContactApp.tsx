'use client';

import React from 'react';
import portfolioData from '@/data/portfolio.json';

const ContactApp: React.FC = () => {
  return (
    <div className="w-full h-full p-4 md:p-6 text-pop-text-light text-xs md:text-sm overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-pop-accent mb-2">Contact</h1>
      <p className="text-pop-text-muted/90 mb-4 md:mb-6">Thanks for checking out my portfolio — feel free to reach out.</p>

      <div className="space-y-4 text-sm text-pop-text-muted/90">
        <div>
          <strong className="text-pop-text-light">Email</strong>
          <div><a href={`mailto:${portfolioData.contact.email}`} className="text-pop-accent">{portfolioData.contact.email}</a></div>
        </div>

        <div>
          <strong className="text-pop-text-light">Social</strong>
          <div className="flex gap-2 md:gap-3 mt-2">
            <a href={portfolioData.contact.twitter} className="border px-2 md:px-3 py-1 rounded text-[10px] md:text-xs text-pop-accent hover:bg-pop-accent/10">Twitter</a>
            <a href={portfolioData.contact.github} className="border px-2 md:px-3 py-1 rounded text-[10px] md:text-xs text-pop-accent hover:bg-pop-accent/10">GitHub</a>
            <a href={portfolioData.contact.linkedin} className="border px-2 md:px-3 py-1 rounded text-[10px] md:text-xs text-pop-accent hover:bg-pop-accent/10">LinkedIn</a>
          </div>
        </div>

        <div>
          <strong className="text-pop-text-light">Open for</strong>
          <div className="mt-1 text-sm text-pop-text-muted/80">Freelance contract work, product-focused roles, and collaborations.</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-pop-text-light font-semibold mb-2">Quick message</h3>
        <form onSubmit={(e) => { e.preventDefault(); alert('Demo: message sent (not functional in demo)'); }} className="flex flex-col gap-2">
          <input placeholder="Your email" className="p-2 bg-pop-dark/60 rounded border border-pop-text-muted/20 text-xs md:text-sm" />
          <textarea placeholder="Message" rows={4} className="p-2 bg-pop-dark/60 rounded border border-pop-text-muted/20 text-xs md:text-sm" />
          <button className="self-start bg-pop-accent px-3 md:px-4 py-1.5 md:py-2 rounded mt-2 text-xs md:text-sm">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactApp;
