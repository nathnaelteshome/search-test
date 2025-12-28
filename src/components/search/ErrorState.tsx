import Link from 'next/link';
import type { SearchError } from '@/types/search';

interface ErrorStateProps {
  error: SearchError;
  onRetry: () => void;
}

function getErrorDetails(error: SearchError): {
  title: string;
  suggestion: string;
  icon: 'warning' | 'clock' | 'server';
} {
  switch (error.code) {
    case 'SERVICE_UNAVAILABLE':
      return {
        title: 'Service Temporarily Unavailable',
        suggestion: 'Our servers are experiencing high traffic. This usually resolves within a few minutes.',
        icon: 'server',
      };
    case 'TIMEOUT':
      return {
        title: 'Search Timed Out',
        suggestion: 'Try using fewer or more specific search terms.',
        icon: 'clock',
      };
    case 'NETWORK_ERROR':
      return {
        title: 'Connection Problem',
        suggestion: 'Please check your internet connection and try again.',
        icon: 'warning',
      };
    case 'NOT_FOUND':
      return {
        title: 'Not Found',
        suggestion: 'The item you\'re looking for doesn\'t exist or has been removed.',
        icon: 'warning',
      };
    case 'INVALID_PARAMS':
    case 'MISSING_QUERY':
      return {
        title: 'Invalid Search',
        suggestion: 'Please enter a valid search term.',
        icon: 'warning',
      };
    default:
      return {
        title: 'Something Went Wrong',
        suggestion: 'An unexpected error occurred. Our team has been notified.',
        icon: 'warning',
      };
  }
}

function ErrorIcon({ type }: { type: 'warning' | 'clock' | 'server' }) {
  const icons = {
    warning: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    ),
    clock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    server: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
      />
    ),
  };

  return (
    <svg
      className="h-7 w-7 text-red-600 dark:text-red-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {icons[type]}
    </svg>
  );
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const { title, suggestion, icon } = getErrorDetails(error);

  return (
    <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-900/20">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
        <ErrorIcon type={icon} />
      </div>
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">{title}</h3>
      <p className="mt-2 text-red-600 dark:text-red-400">{error.message}</p>
      <p className="mt-1 text-sm text-red-500 dark:text-red-400/80">{suggestion}</p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-800 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-900/30 dark:focus:ring-offset-neutral-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Go home
        </Link>
      </div>
      {error.code && (
        <p className="mt-4 text-xs text-red-400 dark:text-red-500">Error code: {error.code}</p>
      )}
    </div>
  );
}
