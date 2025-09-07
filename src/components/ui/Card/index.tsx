
import React from 'react';
import styles from './styles.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles.card} ${className || ''}`}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = "Card";
