interface AlBadrLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark' | 'glass';
}

export default function AlBadrLogo({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'light',
}: AlBadrLogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Bespoke Emblem: Deep Navy Blue & Crisp White */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105 ${
          variant === 'dark'
            ? 'bg-slate-900 text-white border border-slate-700/80'
            : 'bg-[#0F172A] text-white shadow-slate-900/20'
        }`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 text-white"
        >
          {/* Stylized Crescent (Al-Badr) in Crisp Pure White */}
          <path
            d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C24.5714 35 28.6655 32.9515 31.4055 29.7423C24.819 29.0837 19.6429 23.5132 19.6429 16.7143C19.6429 11.9682 22.1852 7.82024 26.0028 5.61718C24.1205 5.21556 22.0991 5 20 5Z"
            fill="#FFFFFF"
          />
          {/* Digital Spark in Pure White */}
          <circle cx="28" cy="14" r="3.2" fill="#FFFFFF" />
          <path
            d="M28 8.5V11M28 17V19.5M22.5 14H25M31 14H33.5"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Ambient Hairline Border */}
        <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none" />
      </div>

      {/* Typography Lockup: Deep Navy & Crisp White */}
      <div className="flex flex-col text-right leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${textSizes[size]} ${
              variant === 'dark' ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            البدر
          </span>
          <span
            className={`font-semibold ${textSizes[size]} ${
              variant === 'dark' ? 'text-slate-200' : 'text-[#1E293B]'
            }`}
          >
            للبرمجيات
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`text-[10px] font-mono tracking-wider mt-1 ${
              variant === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            AL-BADR SOFTWARE ENTERPRISE
          </span>
        )}
      </div>
    </div>
  );
}
