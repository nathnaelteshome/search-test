'use client';

import { PRODUCT_CATEGORIES } from '@/constants/search';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    if (index === 0 && value > newRange[1]) newRange[1] = value;
    if (index === 1 && value < newRange[0]) newRange[0] = value;
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const handleRatingClick = (rating: number) => {
    const newRating = filters.minRating === rating ? 0 : rating;
    onFiltersChange({ ...filters, minRating: newRating });
  };

  const clearAll = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 500],
      minRating: 0,
    });
  };

  const hasFilters = filters.categories.length > 0 || filters.minRating > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 500;

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-20 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-neutral-900 dark:text-white">Filters</h2>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-sm text-neutral-600 hover:text-neutral-900 underline dark:text-neutral-400 dark:hover:text-white"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="pb-5 border-b border-neutral-100 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-neutral-900 mb-3 dark:text-white">Categories</h3>
          <div className="space-y-2">
            {PRODUCT_CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                    filters.categories.includes(category)
                      ? 'border-neutral-900 bg-neutral-900 dark:border-white dark:bg-white'
                      : 'border-neutral-300 group-hover:border-neutral-400 dark:border-neutral-600 dark:group-hover:border-neutral-500'
                  }`}
                >
                  {filters.categories.includes(category) && (
                    <svg className="h-3 w-3 text-white dark:text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <span className="text-sm text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="py-5 border-b border-neutral-100 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-neutral-900 mb-3 dark:text-white">Price Range</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border border-neutral-200 py-2 pl-7 pr-3 text-sm focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="0"
                />
              </div>
              <span className="text-neutral-400">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border border-neutral-200 py-2 pl-7 pr-3 text-sm focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="500"
                />
              </div>
            </div>
            <div className="relative h-2 rounded-full bg-neutral-100 dark:bg-neutral-700">
              <div
                className="absolute h-full rounded-full bg-neutral-900 dark:bg-white"
                style={{
                  left: `${Math.min((filters.priceRange[0] / 500) * 100, 100)}%`,
                  right: `${Math.max(100 - (filters.priceRange[1] / 500) * 100, 0)}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <h3 className="text-sm font-medium text-neutral-900 mb-3 dark:text-white">Minimum Rating</h3>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  filters.minRating >= rating
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-500 dark:hover:bg-neutral-600'
                }`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          {filters.minRating > 0 && (
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              {filters.minRating}+ stars and above
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
