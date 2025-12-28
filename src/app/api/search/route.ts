import { NextRequest, NextResponse } from 'next/server';
import type { SearchResponse, Product } from '@/types/search';
import { PRODUCT_CATEGORIES, PRODUCT_NAMES } from '@/constants/search';

// Seeded random for consistent results
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function generateMockProducts(query: string, page: number, limit: number): Product[] {
  const lowerQuery = query.toLowerCase();
  const startIndex = (page - 1) * limit;

  // Create a seed based on query for consistent results
  const seed = lowerQuery.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = seededRandom(seed + page);

  const allProducts: Product[] = [];

  // Generate products from all categories that match the query
  PRODUCT_CATEGORIES.forEach((category) => {
    const categoryProducts = PRODUCT_NAMES[category];
    categoryProducts.forEach((productName, productIndex) => {
      const productLower = productName.toLowerCase();
      const categoryLower = category.toLowerCase();

      // Match if query is in product name or category
      if (productLower.includes(lowerQuery) || categoryLower.includes(lowerQuery) || lowerQuery.length <= 2) {
        const productSeed = seededRandom(seed + productIndex + PRODUCT_CATEGORIES.indexOf(category) * 100);

        allProducts.push({
          id: `product-${category}-${productIndex}`,
          name: productName,
          description: `High-quality ${productName.toLowerCase()} with premium features. Perfect for ${category.toLowerCase()} enthusiasts. This product offers excellent value and reliability for everyday use.`,
          price: Math.round((productSeed() * 500 + 19.99) * 100) / 100,
          category,
          image: `/api/placeholder/${300 + (productIndex % 10) * 10}/${300 + (productIndex % 10) * 10}`,
          rating: Math.round((productSeed() * 2 + 3) * 10) / 10,
          inStock: productSeed() > 0.2,
        });
      }
    });
  });

  // Shuffle based on query for variety
  allProducts.sort(() => random() - 0.5);

  // Return paginated slice
  return allProducts.slice(startIndex, startIndex + limit);
}

function countTotalResults(query: string): number {
  const lowerQuery = query.toLowerCase();
  let count = 0;

  PRODUCT_CATEGORIES.forEach((category) => {
    const categoryProducts = PRODUCT_NAMES[category];
    categoryProducts.forEach((productName) => {
      const productLower = productName.toLowerCase();
      const categoryLower = category.toLowerCase();

      if (productLower.includes(lowerQuery) || categoryLower.includes(lowerQuery) || lowerQuery.length <= 2) {
        count++;
      }
    });
  });

  return count;
}

// Simulated delay (1-2 seconds)
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // Validate parameters
  if (!query.trim()) {
    return NextResponse.json(
      { error: { message: 'Query parameter is required', code: 'MISSING_QUERY', status: 400 } },
      { status: 400 }
    );
  }

  if (page < 1 || limit < 1 || limit > 100) {
    return NextResponse.json(
      { error: { message: 'Invalid pagination parameters', code: 'INVALID_PARAMS', status: 400 } },
      { status: 400 }
    );
  }

  // Simulate network delay (1-2 seconds)
  const delayMs = 1000 + Math.random() * 1000;
  await delay(delayMs);

  // Simulate occasional errors for testing (5% chance)
  if (Math.random() < 0.05) {
    return NextResponse.json(
      { error: { message: 'Internal server error', code: 'SERVER_ERROR', status: 500 } },
      { status: 500 }
    );
  }

  // Generate mock results
  const totalResults = countTotalResults(query);
  const maxPage = Math.ceil(totalResults / limit);
  const hasMore = page < maxPage;

  const results = page <= maxPage ? generateMockProducts(query, page, limit) : [];

  const response: SearchResponse = {
    results,
    total: totalResults,
    page,
    limit,
    hasMore,
  };

  return NextResponse.json(response);
}
