'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/search';

interface UseKeyboardNavigationOptions {
  items: Product[];
  containerRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
  onClear?: () => void;
}

export function useKeyboardNavigation({
  items,
  containerRef,
  enabled = true,
  onClear,
}: UseKeyboardNavigationOptions) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const router = useRouter();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || items.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case 'Enter':
          if (focusedIndex >= 0 && items[focusedIndex]) {
            event.preventDefault();
            router.push(`/search/${items[focusedIndex].id}`);
          }
          break;
        case 'Escape':
          setFocusedIndex(-1);
          onClear?.();
          break;
      }
    },
    [enabled, items, focusedIndex, router, onClear]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Listen on document to catch keyboard events even when focus is elsewhere
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, handleKeyDown]);

  // Reset focused index when item count changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [items.length]);

  return {
    focusedIndex,
    setFocusedIndex,
  };
}
