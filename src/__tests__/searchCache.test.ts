import { searchCache } from '@/lib/cache/searchCache';
import type { SearchState } from '@/types/search';

const createMockSearchState = (overrides: Partial<SearchState> = {}): SearchState => ({
  query: 'test',
  results: [],
  page: 1,
  total: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
  ...overrides,
});

describe('SearchCache', () => {
  beforeEach(() => {
    searchCache.clear();
  });

  describe('set and get', () => {
    it('should store and retrieve cached data', () => {
      const mockState = createMockSearchState({ query: 'laptop' });

      searchCache.set('laptop', 1, mockState);
      const result = searchCache.get('laptop', 1);

      expect(result).toEqual(mockState);
    });

    it('should return null for non-existent cache entries', () => {
      const result = searchCache.get('nonexistent', 1);

      expect(result).toBeNull();
    });

    it('should handle case-insensitive queries', () => {
      const mockState = createMockSearchState({ query: 'LAPTOP' });

      searchCache.set('LAPTOP', 1, mockState);
      const result = searchCache.get('laptop', 1);

      expect(result).toEqual(mockState);
    });

    it('should store different pages separately', () => {
      const page1State = createMockSearchState({ page: 1, results: [{ id: '1' }] as any });
      const page2State = createMockSearchState({ page: 2, results: [{ id: '2' }] as any });

      searchCache.set('laptop', 1, page1State);
      searchCache.set('laptop', 2, page2State);

      expect(searchCache.get('laptop', 1)).toEqual(page1State);
      expect(searchCache.get('laptop', 2)).toEqual(page2State);
    });
  });

  describe('clear', () => {
    it('should clear all cached entries', () => {
      const mockState = createMockSearchState();

      searchCache.set('query1', 1, mockState);
      searchCache.set('query2', 1, mockState);
      searchCache.clear();

      expect(searchCache.get('query1', 1)).toBeNull();
      expect(searchCache.get('query2', 1)).toBeNull();
    });
  });

  describe('invalidate', () => {
    it('should invalidate entries matching the query prefix', () => {
      const mockState = createMockSearchState();

      searchCache.set('laptop', 1, mockState);
      searchCache.set('laptop', 2, mockState);
      searchCache.set('phone', 1, mockState);

      searchCache.invalidate('laptop');

      expect(searchCache.get('laptop', 1)).toBeNull();
      expect(searchCache.get('laptop', 2)).toBeNull();
      expect(searchCache.get('phone', 1)).toEqual(mockState);
    });
  });
});
