
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App.tsx';

describe('App Component', () => {
  test('renders navbar with correct text and dark mode button', () => {
    render( <App />);
    
    // Check if the navbar is rendered
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();

    // Check for title and welcome message
    expect(screen.getByText(/Form Generator/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to our website/i)).toBeInTheDocument();

    // Check for the dark mode toggle button
    const darkModeButton = screen.getByRole('button', { name: /dark mode/i });
    expect(darkModeButton).toBeInTheDocument();
  });

  test('toggles dark mode when button is clicked', () => {
    render(<App />);

    const darkModeButton = screen.getByRole('button', { name: /dark mode/i });

    // Initial state: Light Mode
    expect(document.documentElement).not.toHaveClass('dark');

    // Click to enable Dark Mode
    fireEvent.click(darkModeButton);
    expect(document.documentElement).toHaveClass('dark');
    expect(darkModeButton.textContent).toBe('Light Mode');

    // Click to disable Dark Mode
    fireEvent.click(darkModeButton);
    expect(document.documentElement).not.toHaveClass('dark');
    expect(darkModeButton.textContent).toBe('Dark Mode');
  });

  test('loads theme preference from localStorage', () => {
    // Mock localStorage to return "dark"
    localStorage.setItem('theme', 'dark');
    render(<App />);

    // Check if dark mode is applied
    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });

  test('renders JSONEditor and Generated Form components', () => {
    render(<App />);

    // Check if JSONEditor is rendered
    const jsonEditor = screen.getByText(/Enter a valid JSON schema/i);
    expect(jsonEditor).toBeInTheDocument();

    // Simulate providing schema to JSONEditor
    // Normally, you would mock the `onChange` function of JSONEditor here.
    // Assuming it's properly connected, test if the FormGenerator appears after schema is provided.
  });

  test('renders placeholder message when no schema is provided', () => {
    render(<App />);
    const placeholderMessage = screen.getByText(/Enter a valid JSON schema to see the form preview/i);
    expect(placeholderMessage).toBeInTheDocument();
  });
});
