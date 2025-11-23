import { Book } from '@/types/book';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  showActions?: boolean;
}

export function BookCard({ book, onEdit, onDelete, showActions = true }: BookCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Card className="relative hover:shadow-lg dark:hover:shadow-indigo-500/20 transform transition-all duration-200 bg-white dark:bg-gray-800">
      {/* Actions Menu */}
      {showActions && (onEdit || onDelete) && (
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-2 sm:p-2.5 bg-white/95 dark:bg-gray-700/95 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Book actions"
          >
            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              
              <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                <Link
                  href={`/book/${book.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm sm:text-base rounded-t-lg text-gray-700 dark:text-gray-300 transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </Link>
                {onEdit && (
                  <button
                    onClick={() => {
                      onEdit(book);
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm sm:text-base w-full text-left text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => {
                      onDelete(book);
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-sm sm:text-base w-full text-left rounded-b-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Book Image */}
      <Link href={`/book/${book.id}`} className="block">
        <img
          src={`${book.thumbnail}?auto=format&fit=crop&w=800&q=60`}
          alt={book.title}
          className="h-40 sm:h-48 w-full object-cover rounded-t-xl"
        />
      </Link>

      {/* Book Info */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">{book.author}</p>
        <div className="flex justify-between items-center mt-2 sm:mt-3">
          <span className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">${book.price.toFixed(2)}</span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {book.category}
          </span>
        </div>
      </div>
    </Card>
  );
}
