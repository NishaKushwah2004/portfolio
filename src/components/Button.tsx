import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-label-md text-label-md transition-all active:scale-[0.98] outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary-container hover:shadow-lg shadow-primary/20",
    secondary: "bg-secondary-container text-on-secondary-container hover:bg-surface-container-high border border-outline-variant",
    outline: "border border-primary text-primary hover:bg-surface-container-low",
    ghost: "text-secondary hover:text-primary hover:bg-surface-container-low",
    danger: "bg-error text-on-error hover:bg-error/90"
  };

  const sizes = {
    sm: "px-4 py-2 rounded-lg text-xs",
    md: "px-6 py-3 rounded-xl",
    lg: "px-8 py-4 rounded-xl text-base"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        icon && iconPosition === 'left' && <span className="mr-2 flex items-center">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2 flex items-center">{icon}</span>
      )}
    </motion.button>
  );
};
