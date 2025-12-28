# Product Search Interface

A production-quality search interface built with Next.js 14+, TypeScript, and Tailwind CSS. Features real-time debounced search, pagination, caching, and comprehensive error handling.

## Features

### Core Features

- **Real-time Search**: Debounced search input (500ms) for smooth UX
- **Pagination**: "Load More" button for infinite-scroll-like pagination
- **Loading States**: Skeleton loaders during initial search and pagination
- **Error Handling**: Graceful error states with retry functionality
- **Empty States**: Clear messaging when no results are found
- **Search Caching**: In-memory LRU cache prevents redundant API calls

### Bonus Features

- **URL State Sync**: Query and page are synced with URL parameters
- **Keyboard Navigation**: Arrow keys to navigate, Enter to select, Escape to clear
- **Request Cancellation**: AbortController cancels pending requests on new search

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict typing)
- **Styling**: Tailwind CSS (no UI libraries)
- **State Management**: React useReducer + custom hooks

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd test-project1
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The root page redirects to `/search` where you can start searching.

## Project Structure

```
src/
├── app/
│   ├── api/search/route.ts     # Mock API endpoint
│   ├── search/
│   │   ├── page.tsx            # Search page (Server Component)
│   │   ├── error.tsx           # Error boundary
│   │   └── _components/
│   │       └── SearchContainer.tsx  # Main client component
│   ├── layout.tsx
│   ├── page.tsx                # Redirects to /search
│   └── global-error.tsx        # Global error boundary
├── components/search/
│   ├── SearchInput.tsx         # Debounced input with clear button
│   ├── ProductCard.tsx         # Product result card
│   ├── SearchResults.tsx       # Results list container
│   ├── SearchSkeleton.tsx      # Loading skeleton
│   ├── EmptyState.tsx          # No results state
│   ├── ErrorState.tsx          # Error with retry
│   └── LoadMoreButton.tsx      # Pagination button
├── hooks/
│   ├── useDebounce.ts          # Generic debounce hook
│   ├── useSearch.ts            # Main search hook (orchestrates everything)
│   └── useKeyboardNavigation.ts # Keyboard nav for results
├── lib/
│   ├── api/searchClient.ts     # Fetch wrapper with AbortController
│   └── cache/searchCache.ts    # LRU cache implementation
├── types/search.ts             # TypeScript interfaces
└── constants/search.ts         # Configuration constants
```

## Architecture Decisions

### State Management

- **useReducer** over useState for complex state transitions
- **Local state** instead of Context (search is self-contained)
- **URL as source of truth** for query and pagination state

### Race Condition Handling

1. AbortController cancels pending requests when a new search starts
2. Debouncing reduces request frequency
3. State updates ignore stale responses

### Caching Strategy

- In-memory LRU cache with 5-minute TTL
- Cache key format: `{query}:{page}`
- Maximum 50 cached entries
- Cache checked before API calls

### Error Handling

- Route-level error boundary (`search/error.tsx`)
- Global error boundary (`global-error.tsx`)
- Component-level error state with retry button
- API errors gracefully handled in useSearch hook

## Mock API

The mock API (`/api/search`) simulates real-world behavior:

- **1-2 second delay** for realistic loading states
- **5% random error rate** for testing error handling
- **Seeded random** for consistent results per query
- **Pagination support** with `hasMore` flag

### API Response Format

```typescript
{
  results: Product[],
  total: number,
  page: number,
  limit: number,
  hasMore: boolean
}
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
