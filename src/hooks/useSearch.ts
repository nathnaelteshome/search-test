"use client";

import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebounce } from "./useDebounce";
import { searchClient } from "@/lib/api/searchClient";
import { searchCache } from "@/lib/cache/searchCache";
import type {
  SearchState,
  SearchAction,
} from "@/types/search";
import { SEARCH_CONFIG } from "@/constants/search";

const initialState: SearchState = {
  query: "",
  results: [],
  page: 1,
  total: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SEARCH_START":
      return {
        ...state,
        query: action.query,
        isLoading: true,
        error: null,
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        results: action.payload.results,
        page: action.payload.page,
        total: action.payload.total,
        totalPages: Math.ceil(action.payload.total / SEARCH_CONFIG.RESULTS_PER_PAGE),
        isLoading: false,
        error: null,
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "CLEAR_SEARCH":
      return initialState;
    case "RESTORE_FROM_CACHE":
      return action.payload;
    default:
      return state;
  }
}

export function useSearch() {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebounce(inputValue, SEARCH_CONFIG.DEBOUNCE_DELAY);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isInitializedRef = useRef(false);
  const lastSearchedQueryRef = useRef("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateURL = useCallback(
    (query: string, page: number) => {
      const params = new URLSearchParams();

      if (query) {
        params.set("q", query);
        if (page > 1) {
          params.set("page", page.toString());
        }
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  const performSearch = useCallback(
    async (query: string, page: number) => {
      // Cancel any pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Check cache first
      const cached = searchCache.get(query, page);
      if (cached) {
        dispatch({ type: "RESTORE_FROM_CACHE", payload: cached });
        updateURL(query, page);
        return;
      }

      abortControllerRef.current = new AbortController();
      dispatch({ type: "SEARCH_START", query });

      try {
        const response = await searchClient.search(query, page, {
          signal: abortControllerRef.current.signal,
        });

        if (response.error) {
          dispatch({ type: "SEARCH_ERROR", error: response.error });
          return;
        }

        dispatch({ type: "SEARCH_SUCCESS", payload: response.data! });

        // Cache the result
        const newState: SearchState = {
          query,
          results: response.data!.results,
          page: response.data!.page,
          total: response.data!.total,
          totalPages: Math.ceil(response.data!.total / SEARCH_CONFIG.RESULTS_PER_PAGE),
          isLoading: false,
          error: null,
        };
        searchCache.set(query, page, newState);

        updateURL(query, page);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          return; // Ignore aborted requests
        }

        dispatch({
          type: "SEARCH_ERROR",
          error: {
            message: "An unexpected error occurred",
            code: "UNKNOWN_ERROR",
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

    const urlQuery = searchParams.get("q") || "";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);

    if (urlQuery) {
      setInputValue(urlQuery);
      lastSearchedQueryRef.current = urlQuery;
      // Check cache first
      const cached = searchCache.get(urlQuery, urlPage);
      if (cached) {
        dispatch({ type: "RESTORE_FROM_CACHE", payload: cached });
      } else {
        performSearch(urlQuery, urlPage);
      }
    }
  }, [searchParams, performSearch]);

  // Perform search when debounced query changes (only for NEW queries, not page changes)
  useEffect(() => {
    // Skip on initial mount (handled by URL sync above)
    if (!isInitializedRef.current) return;

    // Skip if query hasn't actually changed (prevents re-running on page changes)
    if (debouncedQuery === lastSearchedQueryRef.current) return;

    if (!debouncedQuery.trim()) {
      dispatch({ type: "CLEAR_SEARCH" });
      updateURL("", 1);
      lastSearchedQueryRef.current = "";
      return;
    }

    // Update the ref to track this query
    lastSearchedQueryRef.current = debouncedQuery;

    // Reset to page 1 when query changes
    performSearch(debouncedQuery, 1);
  }, [debouncedQuery, performSearch, updateURL]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= state.totalPages && !state.isLoading && state.query) {
        performSearch(state.query, page);
      }
    },
    [state.query, state.totalPages, state.isLoading, performSearch]
  );

  const clearSearch = useCallback(() => {
    setInputValue("");
    lastSearchedQueryRef.current = "";
    dispatch({ type: "CLEAR_SEARCH" });
    updateURL("", 1);
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
    totalPages: state.totalPages,
    currentPage: state.page,
    isLoading: state.isLoading,
    error: state.error,
    query: state.query,

    // Actions
    setInputValue,
    goToPage,
    clearSearch,
    retry,
  };
}
