import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js navigation hooks globally
let mockSearchParams: Record<string, string> = {};
let mockCurrentRoute = '/';

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => mockSearchParams[key] || null, // Return the value for the given key
  }),
  useRouter: () => ({
    push: vi.fn((url: string) => {
      mockCurrentRoute = url; // Update the current route
    }),
    pathname: mockCurrentRoute, // Return the current route
  }),
}));

// Helper function to set searchParams and current route
export function setMockNavigation(
  params: Record<string, string>,
  route: string = '/',
) {
  mockSearchParams = params; // Set the mock searchParams
  mockCurrentRoute = route; // Set the mock current route
}
