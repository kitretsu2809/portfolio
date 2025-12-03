'use client';

import React from 'react';

const SystemInfoApp: React.FC = () => {
  const [info, setInfo] = React.useState({ userAgent: 'unknown', platform: 'unknown', width: 0, height: 0 });

  React.useEffect(() => {
    setInfo({
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      platform: typeof navigator !== 'undefined' ? (navigator as any).platform || 'unknown' : 'server',
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
  }, []);

  return (
    <div className="w-full h-full p-6 text-pop-text-light overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-pop-accent mb-2">System Info</h1>
      <div className="mt-3 space-y-3 text-sm text-pop-text-muted/90">
        <div><strong className="text-pop-text-light">User Agent:</strong> <div className="mt-1 font-mono text-xs text-pop-text-muted/80 break-words">{info.userAgent}</div></div>
        <div><strong className="text-pop-text-light">Platform:</strong> <div className="mt-1 text-xs text-pop-text-muted/80">{info.platform}</div></div>
        <div><strong className="text-pop-text-light">Viewport:</strong> <div className="mt-1 text-xs text-pop-text-muted/80">{info.width} × {info.height}</div></div>
      </div>

      <div className="mt-6 text-sm text-pop-text-muted/80">Note: This is a small demo -- real system information may require platform-specific checks or native APIs.</div>
    </div>
  );
};

export default SystemInfoApp;
