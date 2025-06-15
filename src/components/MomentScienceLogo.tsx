import React from 'react';

interface MomentScienceLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MomentScienceLogo: React.FC<MomentScienceLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>      <svg 
        viewBox="0 0 512 512" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#FF4A16', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#FF3A06', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        
        {/* Outer rounded rectangle with gradient */}
        <rect 
          x="0" 
          y="0" 
          width="512" 
          height="512" 
          rx="112" 
          ry="112" 
          fill="url(#logoGradient)"
        />
        
        {/* Inner content area */}
        <rect 
          x="32" 
          y="32" 
          width="448" 
          height="448" 
          rx="80" 
          ry="80" 
          fill="#FAFAFA"
        />
        
        {/* "Ms" text */}
        <text 
          x="256" 
          y="340" 
          fontSize="220"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="700"
          textAnchor="middle"
          fill="#FF4A16"
        >
          Ms
        </text>
      </svg>
    </div>
  );
};

export default MomentScienceLogo;
