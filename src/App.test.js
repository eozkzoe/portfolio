import { render, screen } from '@testing-library/react';
import App from './App';

test('renders name', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Ethan/i)[0];
  expect(linkElement).toBeInTheDocument();
});
