'use client';

import { useRef, useCallback } from 'react';
import {
  SearchInput,
  SearchResults,
  SearchSkeleton,
  EmptyState,
  ErrorState,
  LoadMoreButton,
} from '@/components/search';
import { useSearch } from '@/hooks/useSearch';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

export function SearchContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    inputValue,
    results,
    total,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    query,
    setInputValue,
    loadMore,
    clearSearch,
    retry,
  } = useSearch();

  const handleResultClick = useCallback((index: number) => {
    const result = results[index];
    if (result) {
      // In a real app, this would navigate to the product page
      console.log('Selected product:', result);
    }
  }, [results]);

  const { focusedIndex, setFocusedIndex } = useKeyboardNavigation({
    itemCount: results.length,
    onSelect: handleResultClick,
    containerRef,
    enabled: results.length > 0 && !isLoading,
  });

  const showResults = !isLoading && !error && results.length > 0;
  const showEmpty = !isLoading && !error && query && results.length === 0;
  const showInitial = !isLoading && !error && !query;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Search Input */}
      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onClear={clearSearch}
        isLoading={isLoading}
      />

      {/* Results Count */}
      {showResults && (
        <p className="text-sm text-neutral-500">
          Found <span className="font-medium text-neutral-700">{total}</span> product
          {total !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Error State */}
      {error && !isLoading && <ErrorState error={error} onRetry={retry} />}

      {/* Loading State */}
      {isLoading && <SearchSkeleton />}

      {/* Results */}
      {showResults && (
        <>
          <SearchResults
            results={results}
            focusedIndex={focusedIndex}
            onItemClick={handleResultClick}
            onItemHover={setFocusedIndex}
          />
          {hasMore && <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />}
        </>
      )}

      {/* Empty State */}
      {showEmpty && <EmptyState query={query} />}

      {/* Initial State */}
      {showInitial && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <svg
              className="h-8 w-8 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">Search our products</h3>
          <p className="mt-2 text-neutral-500 max-w-sm mx-auto">
            Start typing to search through our collection of tech products and accessories.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['Headphones', 'Keyboard', 'Mouse', 'Monitor'].map((term) => (
              <button
                key={term}
                onClick={() => setInputValue(term)}
                className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-50"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Navigation Hint */}
      {showResults && (
        <div className="flex items-center justify-center gap-4 pt-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-mono">
              ↑
            </kbd>
            <kbd className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-mono">
              ↓
            </kbd>
            to navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-mono">
              Enter
            </kbd>
            to select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-mono">
              Esc
            </kbd>
            to clear
          </span>
        </div>
      )}
    </div>
  );
}
