'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseKeyboardNavigationOptions {
  itemCount: number;
  onSelect: (index: number) => void;
  containerRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  containerRef,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || itemCount === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => (prev < itemCount - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : itemCount - 1));
          break;
        case 'Enter':
          if (focusedIndex >= 0) {
            event.preventDefault();
            onSelect(focusedIndex);
          }
          break;
        case 'Escape':
          setFocusedIndex(-1);
          break;
      }
    },
    [enabled, itemCount, focusedIndex, onSelect]
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
  }, [itemCount]);

  return {
    focusedIndex,
    setFocusedIndex,
  };
}
