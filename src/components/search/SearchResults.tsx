'use client';

import { ProductCard } from './ProductCard';
import type { Product } from '@/types/search';

interface SearchResultsProps {
  results: Product[];
  focusedIndex: number;
  onItemHover: (index: number) => void;
}

export function SearchResults({
  results,
  focusedIndex,
  onItemHover,
}: SearchResultsProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="listbox"
      aria-label="Search results"
    >
      {results.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isFocused={index === focusedIndex}
          onMouseEnter={() => onItemHover(index)}
          index={index}
        />
      ))}
    </div>
  );
}
