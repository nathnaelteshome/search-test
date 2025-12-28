'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
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

const TYPING_WORDS = ['Headphones', 'Keyboard', 'Mouse', 'Monitor'];

function useTypingAnimation() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDelay = isDeleting ? 50 : 2000;

    if (!isDeleting && displayText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentWord.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  return displayText;
}

export function SearchContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortOption, setSortOption] = useState<'relevance' | 'price_low' | 'price_high' | 'rating'>('relevance');
  const typingText = useTypingAnimation();

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

  // Apply client-side sorting
  const sortedResults = useMemo(() => {
    const sorted = [...results];

    switch (sortOption) {
      case 'price_low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sorted;
  }, [results, sortOption]);

  const { focusedIndex, setFocusedIndex } = useKeyboardNavigation({
    items: sortedResults,
    containerRef,
    enabled: sortedResults.length > 0 && !isLoading,
    onClear: clearSearch,
  });

  const showResults = !isLoading && !error && results.length > 0;
  const showEmpty = !isLoading && !error && query && results.length === 0;
  const showInitial = !isLoading && !error && !query;

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      {showInitial && (
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Discover Products
          </h1>
          <p className="mt-4 text-lg text-neutral-500">
            Premium tech products and accessories
          </p>
        </div>
      )}

      {/* Search Bar */}
      <div className={`mx-auto ${showInitial ? 'max-w-2xl' : 'max-w-full'}`}>
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          onClear={clearSearch}
          isLoading={isLoading}
        />
      </div>

      {/* Category Quick Links */}
      {showInitial && (
        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-3">
            {['Electronics', 'Audio', 'Gaming', 'Accessories', 'Wearables', 'Home & Office'].map((category) => (
              <button
                key={category}
                onClick={() => setInputValue(category)}
                className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Area */}
      {(showResults || isLoading || showEmpty || error) && (
        <div className="mt-8">
          {/* Toolbar */}
          {(showResults || isLoading) && (
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                {showResults && (
                  <>
                    <span className="font-semibold text-neutral-900">{total}</span> products
                    {query && <span className="text-neutral-400"> for &ldquo;{query}&rdquo;</span>}
                  </>
                )}
              </p>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
                className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              >
                <option value="relevance">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && <ErrorState error={error} onRetry={retry} />}

          {/* Loading State */}
          {isLoading && <SearchSkeleton />}

          {/* Results */}
          {showResults && sortedResults.length > 0 && (
            <>
              <SearchResults
                results={sortedResults}
                focusedIndex={focusedIndex}
                onItemHover={setFocusedIndex}
              />
              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {showEmpty && <EmptyState query={query} />}
        </div>
      )}

      {/* Featured Section */}
      {showInitial && (
        <div className="mt-16">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 sm:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Start Exploring
              </h2>
              <p className="mt-4 text-neutral-500">
                Search for products or browse categories to find what you need
              </p>

              {/* Typing Animation */}
              <div className="mt-8 flex items-center justify-center">
                <span className="text-lg text-neutral-500">Try searching for </span>
                <span className="ml-2 inline-block min-w-[140px] text-left text-lg font-semibold text-neutral-900">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {TYPING_WORDS.map((term) => (
                  <button
                    key={term}
                    onClick={() => setInputValue(term)}
                    className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
