import React, { useEffect, useState } from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

export default function BorderGlow({
  children,
  className = '',
  borderRadius = '24px',
}: BorderGlowProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
  }, []);

  return (
    <div
      className={`relative p-[1px] overflow-hidden group ${className}`}
      style={{ borderRadius }}
    >
      {/* Animated gradient border track in cobalt blue */}
      {!reducedMotion ? (
        <div
          className="absolute -inset-[150%] opacity-45 group-hover:opacity-80 transition-opacity duration-500 animate-[spin_8s_linear_infinite] pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, #1951FC 0deg, #3781FC 90deg, #CBE9FD 180deg, #0B2CB1 270deg, #1951FC 360deg)',
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0 border border-[#3781FC]/30 pointer-events-none"
          style={{ borderRadius }}
          aria-hidden="true"
        />
      )}

      {/* Inner surface content */}
      <div
        className="relative w-full h-full bg-[#0b0b0a] z-10"
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </div>
  );
}
