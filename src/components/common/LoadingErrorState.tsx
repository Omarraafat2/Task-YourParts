import { Loader2, AlertCircle, BookOpen } from 'lucide-react';

interface LoadingErrorStateProps {
  status: 'loading' | 'error' | 'empty';
  message: string;
}

export function LoadingErrorState({ status, message }: LoadingErrorStateProps) {
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
        <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-300 text-lg">{message}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
        <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mb-4" />
        <p className="text-red-600 dark:text-red-400 text-lg font-medium">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
      <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 text-lg">{message}</p>
    </div>
  );
}