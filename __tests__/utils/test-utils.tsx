import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Create a custom render function that includes any global providers your app needs
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Add your providers here as needed */}
      {children}
    </>
  );
};

// Custom render method that includes providers
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method
export { customRender as render };
