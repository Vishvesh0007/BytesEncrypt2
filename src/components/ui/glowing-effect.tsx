import { useEffect, useRef, useState } from 'react';

interface GlowingEffectProps {
  spread?: number;
  glowColor?: string;
  glowOpacity?: number;
  disabled?: boolean;
}

export default function GlowingEffect({
  spread = 240,
  glowColor = 'rgba(25, 81, 252, 0.18)',
  disabled = false,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (disabled) return;

    // Check pointer fine & reduced motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reducedMotion) return;

    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${spread}px`,
          height: `${spread}px`,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
