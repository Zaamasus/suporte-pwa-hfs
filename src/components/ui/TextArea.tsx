import { forwardRef, TextareaHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { AlertCircle } from 'lucide-react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, hint, fullWidth = true, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={twMerge(fullWidth ? 'w-full' : '', className)}>
        {label && (
          <label 
            htmlFor={textareaId} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={twMerge(
            "block rounded-md shadow-sm bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed px-3 py-2",
            error ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : "",
            fullWidth ? 'w-full' : ''
          )}
          {...props}
        />
        
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

TextArea.displayName = 'TextArea';