import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Helper function to get visible page numbers
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    // Always show first page
    range.push(1);

    // Add pages around current page
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where needed
    let prev = 0;
    for (const i of range) {
      if (typeof i === 'number') {
        if (prev && i - prev > 1) {
          rangeWithDots.push('...');
        }
        rangeWithDots.push(i);
        prev = i;
      }
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages <= 7 ? Array.from({ length: totalPages }, (_, i) => i + 1) : getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 px-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 sm:p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="px-2 sm:px-3 py-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`min-w-9 sm:min-w-11 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                currentPage === page
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm'
                  : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 sm:p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Mobile Page Info */}
      <div className="sm:hidden ml-2 text-xs text-gray-600 dark:text-gray-400">
        {currentPage}/{totalPages}
      </div>
    </div>
  );
}