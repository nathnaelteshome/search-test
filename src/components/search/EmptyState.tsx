interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-white py-16 px-8 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700">
        <svg
          className="h-10 w-10 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">No products found</h3>
      <p className="mt-2 max-w-md text-center text-neutral-500 dark:text-neutral-400">
        We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Try adjusting your search
        or browse our categories.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-neutral-400">Try searching:</span>
        {['Headphones', 'Keyboard', 'Mouse'].map((term) => (
          <span
            key={term}
            className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
          >
            {term}
          </span>
        ))}
      </div>
    </div>
  );
}
