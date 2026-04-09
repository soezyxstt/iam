import React from 'react';
import { cn } from '@/utilities/ui'; // Standard tailwind-merge + clsx utility

// Define intuitive names for your smooth shapes
type OrnamentVariant = 
  | 'blob' 
  | 'bean' 
  | 'droplet' 
  | 'super-ellipse' 
  | 'pill' 
  | 'amoeba' 
  | 'wave' 
  | 'ring';

interface OrnamentProps extends React.SVGAttributes<SVGSVGElement> {
  variant?: OrnamentVariant;
  size?: number | string;
  shadowSize?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  className?: string;
}

const Ornament: React.FC<OrnamentProps> = ({
  variant = 'blob',
  size = 64,
  shadowSize = 'md',
  className,
  ...props
}) => {
  // Shadow mapping for organic depth
  const shadows = {
    none: '',
    sm: 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.05)]',
    md: 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]',
    lg: 'drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]',
    xl: 'drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]',
  };

  const paths: Record<OrnamentVariant, React.ReactNode> = {
    'blob': <path d="M32,4C15,4,4,15,4,32s11,28,28,28s28-11,28-28S49,4,32,4z" />,
    'bean': <path d="M48,16c-8-8-24-4-32,8s-4,24,8,32s24,4,32-8S56,24,48,16z" />,
    'droplet': <path d="M32,2C18,2,8,16,8,32c0,16,10,30,24,30s24-14,24-30C56,16,46,2,32,2z" />,
    'super-ellipse': <rect x="8" y="8" width="48" height="48" rx="18" />,
    'pill': <rect x="4" y="20" width="56" height="24" rx="12" />,
    'amoeba': <path d="M32,2c-15,0-30,10-30,30s15,30,30,30s30-10,30-30S47,2,32,2z M45,45c-8,8-18,8-26,0s-8-18,0-26s18-8,26,0 S53,37,45,45z" fillRule="evenodd" />,
    'wave': <path d="M12,32c0-10,8-18,18-18s18,8,18,18s8,18,18,18" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />,
    'ring': <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="6" />,
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 64 64"
      fill="currentColor"
      // Default styles: low opacity, subtle blur, and brand color
      className={cn(
        "text-brand-primary/90 blur-[10px] transition-all duration-300 ease-in-out",
        shadows[shadowSize],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {paths[variant]}
    </svg>
  );
};

export default Ornament;