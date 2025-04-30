import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Base classes
  const baseClasses = 'flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes based on theme
  const variantClasses = {
    primary: isDarkMode
      ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
      : 'bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-500',
    secondary: isDarkMode
      ? 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500'
      : 'bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-500',
    outline: isDarkMode
      ? 'border border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500'
      : 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    ghost: isDarkMode
      ? 'text-gray-300 hover:bg-gray-700 focus:ring-gray-500'
      : 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };
  
  // Disabled classes
  const disabledClasses = isDarkMode
    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
    : 'bg-gray-200 text-gray-500 cursor-not-allowed';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combined classes
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${props.disabled || isLoading ? disabledClasses : variantClasses[variant]}
    ${widthClasses}
    ${className}
  `.trim();
  
  return (
    <button {...props} className={combinedClasses} disabled={props.disabled || isLoading}>
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!isLoading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;