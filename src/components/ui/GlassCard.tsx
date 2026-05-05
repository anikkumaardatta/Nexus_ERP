import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  key?: React.Key;
}

export default function GlassCard({ 
  children, 
  className, 
  hover = false,
  animate = true,
  ...props
}: GlassCardProps) {
  const Component = animate ? (motion.div as any) : 'div';
  
  return (
    <Component
      initial={animate ? { opacity: 0, y: 10 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      className={cn(
        "glass-card p-6 overflow-hidden",
        hover && "hover:border-indigo-500/30 hover:bg-indigo-500/5 dark:hover:border-white/20 dark:hover:bg-white/5 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn("glass rounded-lg animate-shimmer", className)} />
  );
}
