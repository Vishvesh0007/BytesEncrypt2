import React from 'react';

interface CommonProps {
  variant?: 'primary' | 'ice' | 'deep';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: 'a';
    href: string;
  };

export type GlassPillButtonProps = ButtonAsButton | ButtonAsLink;

export default function GlassPillButton(props: GlassPillButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    glow = true,
    className = '',
    children,
  } = props;

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 py-3.5 text-sm',
    lg: 'w-full py-4 px-8 text-sm md:text-base',
  }[size];

  // Base variant color schemes derived from the exact image palette:
  // #03195b, #0b2cb1, #1951fc, #3781fc, #cbe9fd
  const variantStyles = {
    primary: {
      btn: 'bg-gradient-to-b from-[#3781FC] via-[#1951FC] to-[#0B2CB1] text-white border-[rgba(203,233,253,0.4)] shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.75),inset_0_-2px_4px_0_rgba(3,25,91,0.7),inset_0_0_14px_0_rgba(203,233,253,0.35),0_4px_20px_-2px_rgba(25,81,252,0.45),0_0_28px_-4px_rgba(55,129,252,0.35)] hover:shadow-[inset_0_1.5px_3px_0_rgba(255,255,255,0.9),inset_0_-2px_5px_0_rgba(3,25,91,0.85),inset_0_0_20px_0_rgba(203,233,253,0.5),0_6px_28px_-2px_rgba(25,81,252,0.65),0_0_40px_-2px_rgba(55,129,252,0.55)]',
      specular: 'from-white/80 via-white/20 to-transparent',
      bottomReflect: 'from-[#CBE9FD]/50 to-transparent',
      aura: 'from-[#1951FC] via-[#3781FC] to-[#0B2CB1]',
    },
    ice: {
      btn: 'bg-gradient-to-b from-[#CBE9FD] via-[#3781FC] to-[#1951FC] text-[#03195B] border-[rgba(255,255,255,0.75)] shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.9),inset_0_-2px_4px_0_rgba(25,81,252,0.5),inset_0_0_16px_0_rgba(255,255,255,0.45),0_4px_20px_-2px_rgba(55,129,252,0.4),0_0_30px_-4px_rgba(203,233,253,0.45)] hover:shadow-[inset_0_1.5px_3px_0_rgba(255,255,255,1),inset_0_-2px_5px_0_rgba(25,81,252,0.7),inset_0_0_22px_0_rgba(255,255,255,0.6),0_6px_28px_-2px_rgba(55,129,252,0.6),0_0_42px_-2px_rgba(203,233,253,0.6)] font-semibold',
      specular: 'from-white/90 via-white/30 to-transparent',
      bottomReflect: 'from-white/40 to-transparent',
      aura: 'from-[#CBE9FD] via-[#3781FC] to-[#1951FC]',
    },
    deep: {
      btn: 'bg-gradient-to-b from-[#0B2CB1] via-[#03195B] to-[#020D30] text-[#CBE9FD] border-[rgba(55,129,252,0.4)] shadow-[inset_0_1.5px_2px_0_rgba(203,233,253,0.4),inset_0_-2px_4px_0_rgba(0,0,0,0.8),inset_0_0_12px_0_rgba(25,81,252,0.25),0_4px_16px_-2px_rgba(11,44,177,0.4)] hover:shadow-[inset_0_1.5px_3px_0_rgba(203,233,253,0.6),inset_0_-2px_5px_0_rgba(0,0,0,0.9),inset_0_0_16px_0_rgba(25,81,252,0.4),0_6px_22px_-2px_rgba(11,44,177,0.55)]',
      specular: 'from-[#CBE9FD]/50 via-[#3781FC]/15 to-transparent',
      bottomReflect: 'from-[#1951FC]/30 to-transparent',
      aura: 'from-[#03195B] via-[#0B2CB1] to-[#1951FC]',
    },
  }[variant];

  const commonClass = `relative inline-flex items-center justify-center font-medium tracking-wide rounded-full border transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3781FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:scale-[0.98] hover:scale-[1.015] hover:-translate-y-0.5 group overflow-hidden select-none cursor-pointer disabled:opacity-60 disabled:pointer-events-none disabled:transform-none ${sizeClasses} ${variantStyles.btn} ${className}`;

  const innerElements = (
    <>
      {/* 1. Volumetric Glass Specular Highlight (Signature Curved Top Crescent) */}
      <span
        className={`absolute top-[1.5px] inset-x-2 h-[44%] rounded-t-full bg-gradient-to-b ${variantStyles.specular} pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-85`}
        aria-hidden="true"
      />

      {/* 2. Bottom Internal Glass Refraction Rim */}
      <span
        className={`absolute bottom-[1px] inset-x-3.5 h-[26%] rounded-b-full bg-gradient-to-t ${variantStyles.bottomReflect} pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-70`}
        aria-hidden="true"
      />

      {/* 3. Interactive Light Shimmer Sheen sweep on hover */}
      <span
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none"
        aria-hidden="true"
      />

      {/* 4. Ambient External Glow Aura */}
      {glow && (
        <span
          className={`absolute -inset-1.5 rounded-full bg-gradient-to-r ${variantStyles.aura} opacity-35 blur-md group-hover:opacity-65 group-hover:blur-lg transition-all duration-300 -z-10 pointer-events-none`}
          aria-hidden="true"
        />
      )}

      {/* 5. Button Children / Label & Icons */}
      <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-[0_1px_2px_rgba(3,25,91,0.5)]">
        {children}
      </span>
    </>
  );

  if (props.as === 'a') {
    const {
      as: _as,
      variant: _variant,
      size: _size,
      glow: _glow,
      className: _className,
      children: _children,
      ...linkProps
    } = props;
    return (
      <a className={commonClass} {...linkProps}>
        {innerElements}
      </a>
    );
  }

  const {
    as: _as,
    variant: _variant,
    size: _size,
    glow: _glow,
    className: _className,
    children: _children,
    type = 'button',
    ...buttonProps
  } = props;

  return (
    <button type={type} className={commonClass} {...buttonProps}>
      {innerElements}
    </button>
  );
}
