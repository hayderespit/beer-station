import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Example test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('renders a simple component', () => {
    // Example of testing a basic component
    render(<div data-testid="test-element">Hello Test</div>);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello Test');
  });
});
