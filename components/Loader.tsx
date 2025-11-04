
import React from 'react';

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-lg">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-2 border-4 border-blue-500 rounded-full animate-pulse"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-300 animate-pulse">{text}</p>
    </div>
  );
};

export default Loader;
