'use client';

import type { Product } from '@/types/search';

interface ProductCardProps {
  product: Product;
  isFocused: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? 'text-amber-400' : 'text-neutral-200'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= Math.round(rating)} />
      ))}
      <span className="ml-1.5 text-sm text-neutral-500">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ProductCard({ product, isFocused, onClick, onMouseEnter }: ProductCardProps) {
  return (
    <article
      role="option"
      aria-selected={isFocused}
      className={`group cursor-pointer rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 ${
        isFocused
          ? 'border-neutral-400 ring-2 ring-neutral-200'
          : 'border-neutral-100 hover:border-neutral-200 hover:shadow-md'
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="flex gap-4">
        {/* Product Image Placeholder */}
        <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
          <svg
            className="h-10 w-10 text-neutral-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span
              className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                product.inStock
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-neutral-100 text-neutral-500'
              }`}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="mt-1.5 text-sm text-neutral-500 line-clamp-2">{product.description}</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-neutral-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                {product.category}
              </span>
            </div>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      </div>
    </article>
  );
}
