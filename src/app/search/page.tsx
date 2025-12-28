import { Suspense } from 'react';
import { SearchContainer } from './_components/SearchContainer';
import { SearchSkeleton } from '@/components/search/SearchSkeleton';

export const metadata = {
  title: 'Discover Products | TechStore',
  description: 'Search through our collection of tech products and accessories',
};

function SearchFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-9 w-64 rounded-lg shimmer" />
        <div className="mt-2 h-5 w-96 rounded shimmer" />
      </div>
      <div className="mb-8 h-14 w-full rounded-xl shimmer" />
      <SearchSkeleton />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContainer />
    </Suspense>
  );
}
