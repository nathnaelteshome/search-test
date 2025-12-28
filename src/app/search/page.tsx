import { Suspense } from 'react';
import { SearchContainer } from './_components/SearchContainer';
import { SearchSkeleton } from '@/components/search/SearchSkeleton';

export const metadata = {
  title: 'Product Search',
  description: 'Search through our collection of tech products and accessories',
};

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Product Search</h1>
          <p className="mt-2 text-neutral-500">
            Find the perfect tech products and accessories for your needs.
          </p>
        </div>

        {/* Search Container */}
        <Suspense fallback={<SearchSkeleton />}>
          <SearchContainer />
        </Suspense>
      </div>
    </main>
  );
}
