'use client';

import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebounce } from './useDebounce';
import { searchClient } from '@/lib/api/searchClient';
import { searchCache } from '@/lib/cache/searchCache';
import type { SearchState, SearchAction, SearchResponse, Product } from '@/types/search';
import { SEARCH_CONFIG } from '@/constants/search';

const initialState: SearchState = {
  query: '',
  results: [],
  page: 1,
  total: 0,
  hasMore: false,
  isLoading: false,
  isLoadingMore: false,
  error: null,
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SEARCH_START':
      return {
        ...initialState,
        query: action.query,
        isLoading: true,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        results: action.payload.results,
        page: action.payload.page,
        total: action.payload.total,
        hasMore: action.payload.hasMore,
        isLoading: false,
        error: null,
      };
    case 'SEARCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'LOAD_MORE_START':
      return {
        ...state,
        isLoadingMore: true,
      };
    case 'LOAD_MORE_SUCCESS':
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        page: action.payload.page,
        hasMore: action.payload.hasMore,
        isLoadingMore: false,
        error: null,
      };
    case 'LOAD_MORE_ERROR':
      return {
        ...state,
        isLoadingMore: false,
        error: action.error,
      };
    case 'CLEAR_SEARCH':
      return initialState;
    case 'RESTORE_FROM_CACHE':
      return action.payload;
    default:
      return state;
  }
}

export function useSearch() {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const debouncedQuery = useDebounce(inputValue, SEARCH_CONFIG.DEBOUNCE_DELAY);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isInitializedRef = useRef(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateURL = useCallback(
    (query: string, page: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set('q', query);
        if (page > 1) {
          params.set('page', page.toString());
        } else {
          params.delete('page');
        }
      } else {
        params.delete('q');
        params.delete('page');
      }

      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const performSearch = useCallback(
    async (query: string, page: number, append = false) => {
      // Cancel any pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Check cache first (only for initial search, not load more)
      if (!append) {
        const cached = searchCache.get(query, page);
        if (cached) {
          dispatch({ type: 'RESTORE_FROM_CACHE', payload: cached });
          updateURL(query, page);
          return;
        }
      }

      abortControllerRef.current = new AbortController();

      if (append) {
        dispatch({ type: 'LOAD_MORE_START' });
      } else {
        dispatch({ type: 'SEARCH_START', query });
      }

      try {
        const response = await searchClient.search(query, page, {
          signal: abortControllerRef.current.signal,
        });

        if (response.error) {
          const actionType = append ? 'LOAD_MORE_ERROR' : 'SEARCH_ERROR';
          dispatch({ type: actionType, error: response.error });
          return;
        }

        const actionType = append ? 'LOAD_MORE_SUCCESS' : 'SEARCH_SUCCESS';
        dispatch({ type: actionType, payload: response.data! });

        // Cache the result (for non-append searches)
        if (!append) {
          const newState: SearchState = {
            query,
            results: response.data!.results,
            page: response.data!.page,
            total: response.data!.total,
            hasMore: response.data!.hasMore,
            isLoading: false,
            isLoadingMore: false,
            error: null,
          };
          searchCache.set(query, page, newState);
        }

        updateURL(query, page);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // Ignore aborted requests
        }

        const actionType = append ? 'LOAD_MORE_ERROR' : 'SEARCH_ERROR';
        dispatch({
          type: actionType,
          error: {
            message: 'An unexpected error occurred',
            code: 'UNKNOWN_ERROR',
            status: 500,
          },
        });
      }
    },
    [updateURL]
  );

  // Initialize from URL on mount
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const urlQuery = searchParams.get('q') || '';

    if (urlQuery) {
      setInputValue(urlQuery);
      // Check cache first
      const cached = searchCache.get(urlQuery, 1);
      if (cached) {
        dispatch({ type: 'RESTORE_FROM_CACHE', payload: cached });
      } else {
        performSearch(urlQuery, 1);
      }
    }
  }, [searchParams, performSearch]);

  // Perform search when debounced query changes
  useEffect(() => {
    // Skip on initial mount (handled by URL sync above)
    if (!isInitializedRef.current) return;

    if (!debouncedQuery.trim()) {
      dispatch({ type: 'CLEAR_SEARCH' });
      updateURL('', 1);
      return;
    }

    performSearch(debouncedQuery, 1);
  }, [debouncedQuery, performSearch, updateURL]);

  const loadMore = useCallback(() => {
    if (state.hasMore && !state.isLoadingMore && state.query) {
      performSearch(state.query, state.page + 1, true);
    }
  }, [state.query, state.page, state.hasMore, state.isLoadingMore, performSearch]);

  const clearSearch = useCallback(() => {
    setInputValue('');
    dispatch({ type: 'CLEAR_SEARCH' });
    updateURL('', 1);
  }, [updateURL]);

  const retry = useCallback(() => {
    if (state.query) {
      performSearch(state.query, state.page);
    }
  }, [state.query, state.page, performSearch]);

  return {
    // State
    inputValue,
    results: state.results,
    total: state.total,
    hasMore: state.hasMore,
    isLoading: state.isLoading,
    isLoadingMore: state.isLoadingMore,
    error: state.error,
    query: state.query,

    // Actions
    setInputValue,
    loadMore,
    clearSearch,
    retry,
  };
}
