
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white shadow-md rounded-lg p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = "Card";
