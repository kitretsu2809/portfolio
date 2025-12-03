'use client';

import React from 'react';
import portfolioData from '@/data/portfolio.json';

const ContactApp: React.FC = () => {
  return (
    <div className="w-full h-full p-6 text-pop-text-light overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-pop-accent mb-2">Contact</h1>
      <p className="text-pop-text-muted/90 mb-6">Thanks for checking out my portfolio — feel free to reach out.</p>

      <div className="space-y-4 text-sm text-pop-text-muted/90">
        <div>
          <strong className="text-pop-text-light">Email</strong>
          <div><a href={`mailto:${portfolioData.contact.email}`} className="text-pop-accent">{portfolioData.contact.email}</a></div>
        </div>

        <div>
          <strong className="text-pop-text-light">Social</strong>
          <div className="flex gap-3 mt-2">
            <a href={portfolioData.contact.twitter} className="border px-3 py-1 rounded text-xs text-pop-accent hover:bg-pop-accent/10">Twitter</a>
            <a href={portfolioData.contact.github} className="border px-3 py-1 rounded text-xs text-pop-accent hover:bg-pop-accent/10">GitHub</a>
            <a href={portfolioData.contact.linkedin} className="border px-3 py-1 rounded text-xs text-pop-accent hover:bg-pop-accent/10">LinkedIn</a>
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
          <input placeholder="Your email" className="p-2 bg-pop-dark/60 rounded border border-pop-text-muted/20" />
          <textarea placeholder="Message" rows={4} className="p-2 bg-pop-dark/60 rounded border border-pop-text-muted/20" />
          <button className="self-start bg-pop-accent px-4 py-2 rounded mt-2">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactApp;
