'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/search';

interface ProductCardProps {
  product: Product;
  isFocused: boolean;
  onMouseEnter: () => void;
  index?: number;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${filled ? 'text-neutral-900' : 'text-neutral-200'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function ProductCard({ product, isFocused, onMouseEnter, index = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/search/${product.id}`}>
      <article
        role="option"
        aria-selected={isFocused}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white transition-all duration-300 animate-fade-in ${
          isFocused
            ? 'border-neutral-300 shadow-lg'
            : 'border-neutral-100 hover:border-neutral-200 hover:shadow-md'
        }`}
        style={{ animationDelay: `${index * 50}ms` }}
        onMouseEnter={onMouseEnter}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          {!imageError && product.image ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 shimmer" />
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-16 w-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <span className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            {product.category}
          </span>
          <h3 className="mt-1 font-medium text-neutral-900 line-clamp-1 group-hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={star <= Math.round(product.rating)} />
              ))}
            </div>
            <span className="text-xs text-neutral-400">
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Price */}
          <div className="mt-3">
            <span className="text-lg font-semibold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
