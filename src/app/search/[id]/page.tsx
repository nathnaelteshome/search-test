'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/search';

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-5 w-5 ${filled ? 'text-neutral-900' : 'text-neutral-200'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?id=${params.id}`);
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-6 w-32 rounded bg-neutral-200 mb-8" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-square rounded-2xl bg-neutral-200" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-neutral-200" />
              <div className="h-6 w-1/4 rounded bg-neutral-200" />
              <div className="h-24 rounded bg-neutral-200" />
              <div className="h-12 w-1/3 rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Product not found</h1>
          <p className="mt-2 text-neutral-500">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/search"
            className="mt-6 inline-block rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/search" className="text-neutral-500 hover:text-neutral-900">
              Products
            </Link>
          </li>
          <li className="text-neutral-300">/</li>
          <li>
            <span className="text-neutral-500">{product.category}</span>
          </li>
          <li className="text-neutral-300">/</li>
          <li className="text-neutral-900 font-medium truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-32 w-32 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <span className="rounded-lg bg-neutral-900 px-6 py-3 text-lg font-medium text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="text-sm font-medium text-neutral-500">{product.category}</span>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900">{product.name}</h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={star <= Math.round(product.rating)} />
              ))}
            </div>
            <span className="text-sm text-neutral-500">
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <span className="text-4xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-neutral-900">Description</h2>
            <p className="mt-2 text-neutral-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="mt-6">
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
              product.inStock
                ? 'bg-neutral-100 text-neutral-900'
                : 'bg-neutral-100 text-neutral-500'
            }`}>
              <span className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-neutral-900' : 'bg-neutral-400'}`} />
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="mt-8 flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to results
          </button>
        </div>
      </div>
    </div>
  );
}
