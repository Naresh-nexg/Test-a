import React from 'react';

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.75 9h16.5m-16.5 6.75h16.5M9 3.75a16.5 16.5 0 0 1 6 0m-6 16.5a16.5 16.5 0 0 0 6 0" 
    />
  </svg>
);
