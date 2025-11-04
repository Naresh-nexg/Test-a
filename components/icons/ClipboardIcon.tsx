
import React from 'react';

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-8.25c-.621 0-1.125-.504-1.125-1.125V8.844c0-.621.504-1.125 1.125-1.125h.375m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v13.5c0 .621.504 1.125 1.125 1.125h8.25c.621 0 1.125-.504 1.125-1.125v-3.375"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 6.375h-6v-2.25h6v2.25Z"
    />
  </svg>
);
