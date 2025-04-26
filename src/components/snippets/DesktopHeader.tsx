// src/components/snippets/DesktopHeader.tsx
import React from 'react';

interface DesktopHeaderProps {
  borderColor?: string;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ borderColor = 'bg-blue-600' }) => {
  return (
    <header className="h-[70px] bg-white w-full shadow-lg relative">
      <div className={`absolute top-0 left-0 w-full h-[5px] ${borderColor}`} />
      <div className="h-full w-full flex items-center justify-between px-6">
        <img
          src="/images/bcs-connect-logo.png" 
          alt="BCS Connect Logo"
          className="object-contain"
        />
      </div>
    </header>
  );
};

export default DesktopHeader;
