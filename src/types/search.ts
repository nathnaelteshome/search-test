export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
}

export interface SearchResponse {
  results: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchError {
  message: string;
  code: string;
  status: number;
}

export interface SearchState {
  query: string;
  results: Product[];
  page: number;
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: SearchError | null;
}

export type SearchAction =
  | { type: "SEARCH_START"; query: string }
  | { type: "SEARCH_SUCCESS"; payload: SearchResponse }
  | { type: "SEARCH_ERROR"; error: SearchError }
  | { type: "CLEAR_SEARCH" }
  | { type: "RESTORE_FROM_CACHE"; payload: SearchState };

export interface ApiResponse<T> {
  data: T | null;
  error: SearchError | null;
}

export interface FetchOptions {
  signal?: AbortSignal;
  timeout?: number;
}
