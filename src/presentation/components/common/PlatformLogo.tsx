import React from 'react';

export const PlatformLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; showText?: boolean }> = ({
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center space-x-2.5">
      {/* Hexagonal Telecom Nexus Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 via-blue-700 to-indigo-900 text-white shadow-md shadow-brand-700/20 ring-1 ring-white/20 ${iconSizes[size]}`}
      >
        <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
          {/* Hexagon outline */}
          <polygon
            points="16,3 28,10 28,22 16,29 4,22 4,10"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Signal wave / Telecom pulse */}
          <path
            d="M9 16 L13 13 L16 19 L19 11 L23 16"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central Gold Node */}
          <circle cx="16" cy="19" r="2.5" fill="#F59E0B" />
          {/* Top pulse beacon */}
          <circle cx="19" cy="11" r="1.5" fill="#FDE047" />
        </svg>
      </div>

      {showText && (
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-tight text-slate-900 font-display text-sm sm:text-base">
              NexusMEAL <span className="text-brand-700">MIS</span>
            </span>
            <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-800 ring-1 ring-inset ring-brand-600/30">
              Enterprise
            </span>
          </div>
          <p className="text-[10px] font-medium text-slate-500 tracking-wide">
            Digital MEAL & M&E Management Platform
          </p>
        </div>
      )}
    </div>
  );
};
