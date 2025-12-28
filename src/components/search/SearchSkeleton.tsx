interface SearchSkeletonProps {
  count?: number;
}

function CardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-neutral-100 bg-white animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="aspect-square shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 rounded shimmer" />
        <div className="h-5 w-3/4 rounded shimmer" />
        <div className="h-4 w-24 rounded shimmer" />
        <div className="h-6 w-20 rounded shimmer" />
      </div>
    </div>
  );
}

export function SearchSkeleton({ count = 8 }: SearchSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} index={i} />
      ))}
    </div>
  );
}
