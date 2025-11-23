import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent 
            disabled:opacity-50 disabled:cursor-not-allowed
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            transition-colors ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';