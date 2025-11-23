"use client";

import { useState, useEffect, useCallback } from "react";
import { useMyBooksQuery } from "@/features/book-listing/hooks/useBooksQuery";
import { BookCard } from "@/features/book-listing/components/BookCard";
import { BookGrid } from "@/features/book-listing/components/BookGrid";
import { SearchSortFilter } from "@/features/book-listing/components/SearchSortFilter";
import { Pagination } from "@/components/common/Pagination";
import { LoadingErrorState } from "@/components/common/LoadingErrorState";
import { Book } from "@/types/book";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useBookActions } from "@/features/book-management/hooks/useBookActions";

const BOOKS_PER_PAGE = 8;

export default function MyBooksPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title_asc");
  const { deleteBook } = useBookActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, error, isFetching } = useMyBooksQuery({
    page,
    limit: BOOKS_PER_PAGE,
    search,
    sortBy,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setPage(1);
  }, []);

  const handleEdit = useCallback((book: Book) => {
    window.location.href = `/book/${book.id}/edit`;
  }, []);

  const handleDelete = useCallback(
    (book: Book) => {
      if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
        deleteBook.mutate(book.id);
      }
    },
    [deleteBook]
  );

  if (isLoading && !data) {
    return <LoadingErrorState status="loading" message="Loading your books..." />;
  }

  if (isError) {
    return (
      <LoadingErrorState
        status="error"
        message={`Error: ${error?.message || "Failed to load your books"}`}
      />
    );
  }

  const books = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const totalBooks = data?.totalBooks || 0;

  return (
    <div className="py-4 sm:py-6">
      {/* Responsive Header */}
      <div className="flex justify-between items-start gap-3 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Books
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            You have {totalBooks} {totalBooks === 1 ? "book" : "books"}
          </p>
        </div>
        <Link
          href="/book/new"
          className="flex items-center justify-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className=" sm:inline">Add New Book</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      <SearchSortFilter
        search={searchInput}
        sortBy={sortBy}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        showCategory={false}
        placeholder="Search your books by title..."
      />

      {books.length === 0 ? (
        <div className="text-center py-12 px-4">
          {searchInput ? (
            <LoadingErrorState
              status="empty"
              message={`No books found matching "${searchInput}"`}
            />
          ) : (
            <div className="flex flex-col items-center">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 text-gray-300 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No books yet
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                Start building your library by adding your first book
              </p>
              <Link
                href="/book/new"
                className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Your First Book
              </Link>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={isFetching ? "opacity-50 transition-opacity duration-300" : ""}>
            <BookGrid>
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </BookGrid>
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}