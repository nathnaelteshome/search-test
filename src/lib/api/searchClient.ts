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
        if (error.name === 'AbortError') {
          throw error; // Re-throw abort errors to be handled by caller
        }

        if (error.name === 'TimeoutError') {
          return {
            data: null,
            error: {
              message: 'Request timed out',
              code: 'TIMEOUT',
              status: 408,
            },
          };
        }

        return {
          data: null,
          error: {
            message: error.message || 'Network error',
            code: 'NETWORK_ERROR',
            status: 0,
          },
        };
      }

      return {
        data: null,
        error: {
          message: 'Unknown error',
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
