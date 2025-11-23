"use client";

import { useState, useEffect, useCallback } from "react";
import { useBooksQuery } from "@/features/book-listing/hooks/useBooksQuery";
import { BookCard } from "@/features/book-listing/components/BookCard";
import { BookGrid } from "@/features/book-listing/components/BookGrid";
import { SearchSortFilter } from "@/features/book-listing/components/SearchSortFilter";
import { Pagination } from "@/components/common/Pagination";
import { LoadingErrorState } from "@/components/common/LoadingErrorState";
import { Book } from "@/types/book";
import { useBookActions } from "@/features/book-management/hooks/useBookActions";

const BOOKS_PER_PAGE = 8;

export default function BooksShopPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title_asc");
  const currentUserId = "1";
  const { deleteBook } = useBookActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, error, isFetching } = useBooksQuery({
    page,
    limit: BOOKS_PER_PAGE,
    search,
    category,
    sortBy,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
    setPage(1);
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
    return <LoadingErrorState status="loading" message="Loading books..." />;
  }

  if (isError) {
    return (
      <LoadingErrorState
        status="error"
        message={`Error: ${error?.message || "Failed to load books"}`}
      />
    );
  }

  const books = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="py-4 sm:py-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white px-1">
        Books Shop
      </h1>

      <SearchSortFilter
        search={searchInput}
        category={category}
        sortBy={sortBy}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {books.length === 0 ? (
        <LoadingErrorState
          status="empty"
          message="No books found matching your criteria."
        />
      ) : (
        <>
          <div className={isFetching ? "opacity-50 transition-opacity duration-300" : ""}>
            <BookGrid>
              {books.map((book) => {
                const isAuthor = book.authorId === currentUserId;
                return (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={isAuthor ? handleEdit : undefined}
                    onDelete={isAuthor ? handleDelete : undefined}
                  />
                );
              })}
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
