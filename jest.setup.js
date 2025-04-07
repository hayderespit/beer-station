// Import jest-dom custom matchers
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    reload: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

// Suppress console errors and warnings during tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (/Warning: ReactDOM.render is no longer supported/.test(args[0])) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (/Warning: ReactDOM.render is no longer supported/.test(args[0])) {
    return;
  }
  originalConsoleWarn(...args);
};
