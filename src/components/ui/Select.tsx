import { forwardRef, SelectHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { AlertCircle } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label, 
    options, 
    error, 
    hint, 
    fullWidth = true, 
    leftIcon,
    id,
    ...props 
  }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={twMerge(fullWidth ? 'w-full' : '', className)}>
        {label && (
          <label 
            htmlFor={selectId} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <select
            ref={ref}
            id={selectId}
            className={twMerge(
              "block rounded-md shadow-sm bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed",
              leftIcon ? "pl-10" : "pl-3",
              "pr-10 py-2 appearance-none",
              error ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : "",
              fullWidth ? 'w-full' : ''
            )}
            {...props}
          >
            {props.placeholder && (
              <option value="\" disabled>{props.placeholder}</option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';