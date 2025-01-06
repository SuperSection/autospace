import React from 'react';

export interface BrandIconProps {
  children?: React.ReactNode;
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  children = <div className="bg-gray-100 shadow w-2 h-4 animate-park-car" />,
}) => {
  return (
    <div className="inline-block overflow-hidden">
      <div className="flex items-center justify-center border-2 border-primary-500 w-4 h-6">
        {children}
      </div>
    </div>
  );
};
