import type { SearchResponse, SearchError, ApiResponse, FetchOptions } from '@/types/search';
import { SEARCH_CONFIG } from '@/constants/search';

class SearchClient {
  async search(
    query: string,
    page: number = 1,
    options: FetchOptions = {}
  ): Promise<ApiResponse<SearchResponse>> {
    const { signal, timeout = SEARCH_CONFIG.REQUEST_TIMEOUT } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Combine external signal with timeout
    const combinedSignal = signal
      ? this.combineSignals(signal, controller.signal)
      : controller.signal;

    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: SEARCH_CONFIG.RESULTS_PER_PAGE.toString(),
      });

      const response = await fetch(`/api/search?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: combinedSignal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null,
          error: data.error || {
            message: 'Request failed',
            code: 'REQUEST_FAILED',
            status: response.status,
          },
        };
      }

      return { data, error: null };
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        // Check if this was a user-initiated abort (external signal) vs timeout abort
        if (error.name === 'AbortError') {
          // If controller was aborted by our timeout, treat as timeout
          if (controller.signal.aborted && !signal?.aborted) {
            return {
              data: null,
              error: {
                message: 'The search request took too long. Please try again or use a simpler search term.',
                code: 'TIMEOUT',
                status: 408,
              },
            };
          }
          // Otherwise it's a user-initiated abort, re-throw
          throw error;
        }

        if (error.name === 'TimeoutError') {
          return {
            data: null,
            error: {
              message: 'The search request took too long. Please try again or use a simpler search term.',
              code: 'TIMEOUT',
              status: 408,
            },
          };
        }

        // Check for common network issues
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          return {
            data: null,
            error: {
              message: 'Unable to connect to the server. Please check your internet connection.',
              code: 'NETWORK_ERROR',
              status: 0,
            },
          };
        }

        return {
          data: null,
          error: {
            message: 'Something went wrong while searching. Please try again.',
            code: 'NETWORK_ERROR',
            status: 0,
          },
        };
      }

      return {
        data: null,
        error: {
          message: 'An unexpected error occurred. Please try again.',
          code: 'UNKNOWN_ERROR',
          status: 0,
        },
      };
    }
  }

  private combineSignals(signal1: AbortSignal, signal2: AbortSignal): AbortSignal {
    const controller = new AbortController();

    const onAbort = () => controller.abort();

    signal1.addEventListener('abort', onAbort);
    signal2.addEventListener('abort', onAbort);

    if (signal1.aborted || signal2.aborted) {
      controller.abort();
    }

    return controller.signal;
  }
}

export const searchClient = new SearchClient();
