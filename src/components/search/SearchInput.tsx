'use client';

import { useRef, useEffect } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  isLoading = false,
  placeholder = 'Search products...',
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative group">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600" />
        ) : (
          <svg
            className="h-5 w-5 text-neutral-400 transition-colors group-focus-within:text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-2xl border border-neutral-200 bg-white py-4 pl-14 pr-14 text-base text-neutral-900 placeholder-neutral-400 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md focus:border-neutral-300 focus:shadow-md focus:outline-none focus:ring-0"
        placeholder={placeholder}
        aria-label="Search products"
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-5 text-neutral-400 transition-colors hover:text-neutral-600"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
