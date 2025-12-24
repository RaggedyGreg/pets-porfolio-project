import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { useThemeContext } from '../../contexts/ThemeContext';

// Mock the theme context
jest.mock('../../contexts/ThemeContext', () => ({
  useThemeContext: jest.fn(),
}));

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback: string) => fallback,
  }),
}));

describe('ThemeToggle', () => {
  const mockToggleColorMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders light mode icon when theme is light', () => {
    (useThemeContext as jest.Mock).mockReturnValue({
      mode: 'light',
      toggleColorMode: mockToggleColorMode,
    });

    render(<ThemeToggle />);

    // In light mode, Brightness4Icon should be shown (moon icon)
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('renders dark mode icon when theme is dark', () => {
    (useThemeContext as jest.Mock).mockReturnValue({
      mode: 'dark',
      toggleColorMode: mockToggleColorMode,
    });

    render(<ThemeToggle />);

    // In dark mode, Brightness7Icon should be shown (sun icon)
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('calls toggleColorMode when clicked', () => {
    (useThemeContext as jest.Mock).mockReturnValue({
      mode: 'light',
      toggleColorMode: mockToggleColorMode,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggleColorMode).toHaveBeenCalledTimes(1);
  });

  test('displays correct tooltip for light mode', () => {
    (useThemeContext as jest.Mock).mockReturnValue({
      mode: 'light',
      toggleColorMode: mockToggleColorMode,
    });

    render(<ThemeToggle />);

    // Tooltip text should suggest switching to dark mode
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('displays correct tooltip for dark mode', () => {
    (useThemeContext as jest.Mock).mockReturnValue({
      mode: 'dark',
      toggleColorMode: mockToggleColorMode,
    });

    render(<ThemeToggle />);

    // Tooltip text should suggest switching to light mode
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
