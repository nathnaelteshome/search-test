'use client';

import { ProductCard } from './ProductCard';
import type { Product } from '@/types/search';

interface SearchResultsProps {
  results: Product[];
  focusedIndex: number;
  onItemClick: (index: number) => void;
  onItemHover: (index: number) => void;
}

export function SearchResults({
  results,
  focusedIndex,
  onItemClick,
  onItemHover,
}: SearchResultsProps) {
  return (
    <div className="space-y-3" role="listbox" aria-label="Search results">
      {results.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isFocused={index === focusedIndex}
          onClick={() => onItemClick(index)}
          onMouseEnter={() => onItemHover(index)}
        />
      ))}
    </div>
  );
}
