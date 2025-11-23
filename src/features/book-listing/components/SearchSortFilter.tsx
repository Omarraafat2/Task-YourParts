import { Search } from 'lucide-react';
import { memo } from 'react';

interface SearchSortFilterProps {
  search: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  
  category?: string;
  onCategoryChange?: (value: string) => void;
  showCategory?: boolean;
  placeholder?: string;
}

export const SearchSortFilter = memo(function SearchSortFilter({
  search,
  sortBy,
  onSearchChange,
  onSortChange,
  category,
  onCategoryChange,
  showCategory = true,
  placeholder = "Search books by title...",
}: SearchSortFilterProps) {
  const categories = ['All', 'Technology', 'Science', 'History', 'Fantasy', 'Biography'];

  return (
    <div className="mb-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          autoComplete="off"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        {showCategory && category !== undefined && onCategoryChange && (
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        {/* Sort */}
        <div className="flex items-center gap-2">
          {!showCategory && (
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
          )}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <option value="title_asc">Title (A-Z)</option>
            <option value="title_desc">Title (Z-A)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
});
