"use client";

import { useQuery } from "@tanstack/react-query";
import { LoadingErrorState } from "@/components/common/LoadingErrorState";
import { Book } from "@/types/book";
import { MoreVertical, Edit, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useBookActions } from "@/features/book-management/hooks/useBookActions";

type BookDetailsParams = {
  id: string;
};

export default function BookDetailsPage({
  params,
}: {
  params: BookDetailsParams | Promise<BookDetailsParams>;
}) {
  const unwrappedParams = use(params as Promise<BookDetailsParams>);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { deleteBook } = useBookActions();
  const currentUserId = "1";

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery<Book>({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) throw new Error("Book not found");
      return response.json();
    },
  });

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${book?.title}"?`)) {
      deleteBook.mutate(id, {
        onSuccess: () => router.push("/my-books"),
      });
    }
    setShowMenu(false);
  };

  if (isLoading) {
    return <LoadingErrorState status="loading" message="Loading book details..." />;
  }

  if (isError || !book) {
    return (
      <div className="py-4 px-4">
        <LoadingErrorState
          status="error"
          message={error?.message || "Book not found"}
        />
      </div>
    );
  }

  const isAuthor = book.authorId === currentUserId;

  return (
    <div className="py-4 sm:py-6 max-w-4xl mx-auto px-4 sm:px-6 transition-colors duration-200">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        Back to Books
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
        {/* Header with Image and Actions */}
        <div className="relative">
          <img
            src={`${book.thumbnail}?auto=format&fit=crop&w=1200&q=80`}
            alt={book.title}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          />

          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/20 to-transparent" />

          {/* Actions Menu - Only for Author */}
          {isAuthor && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 sm:p-3 bg-white/95 dark:bg-gray-700/95 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Book actions"
              >
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowMenu(false)}
                  />

                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-30 overflow-hidden transition-colors">
                    <Link
                      href={`/book/${book.id}/edit`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors text-sm sm:text-base"
                      onClick={() => setShowMenu(false)}
                    >
                      <Edit className="w-4 h-4" />
                      <span className="font-medium">Edit Book</span>
                    </Link>
                    <button
                      onClick={handleDelete}
                      disabled={deleteBook.isPending}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-300 transition-colors w-full text-left disabled:opacity-50 text-sm sm:text-base"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="font-medium">
                        {deleteBook.isPending ? "Deleting..." : "Delete Book"}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {book.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                by {book.author}
              </p>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-2 sm:gap-3">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600 dark:text-indigo-300">
                ${book.price.toFixed(2)}
              </p>
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                {book.category}
              </span>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              About this book
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/40 p-3 sm:p-4 rounded-lg transition-colors">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mb-1">
                Author
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                {book.author}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/40 p-3 sm:p-4 rounded-lg transition-colors">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mb-1">
                Category
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                {book.category}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/40 p-3 sm:p-4 rounded-lg transition-colors">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mb-1">
                Price
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                ${book.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}