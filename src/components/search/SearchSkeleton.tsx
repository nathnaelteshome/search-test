export function SearchSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-neutral-100 bg-white p-5"
        >
          <div className="flex gap-4">
            {/* Image placeholder */}
            <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-neutral-100" />

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-48 rounded bg-neutral-100" />
                <div className="h-5 w-16 rounded-full bg-neutral-100" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-neutral-100" />
                <div className="h-4 w-3/4 rounded bg-neutral-100" />
              </div>
              <div className="flex justify-between pt-1">
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded bg-neutral-100" />
                  <div className="h-6 w-20 rounded bg-neutral-100" />
                </div>
                <div className="h-5 w-24 rounded bg-neutral-100" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
