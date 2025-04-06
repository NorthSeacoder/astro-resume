
/**
 * Theme utility functions for managing dark/light mode
 */

type Theme = 'light' | 'dark';

// Get the current theme from localStorage or system preference
export const getInitialTheme = (): Theme => {
  // Check if we're in the browser
  if (typeof window === 'undefined') return 'light';
  
  // First check localStorage
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    return savedTheme;
  }
  
  // Then check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  // Default to light mode
  return 'light';
};

// Save theme to localStorage
export const saveTheme = (theme: Theme): void => {
  localStorage.setItem('theme', theme);
};

// Apply theme to document
export const applyTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const isDark = theme === 'dark';
  
  root.classList.toggle('dark', isDark);
};

// Initialize theme on page load
export const initializeTheme = (): void => {
  const theme = getInitialTheme();
  applyTheme(theme);
};

// Toggle between light and dark mode
export const toggleTheme = (): Theme => {
  const currentTheme = getInitialTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  saveTheme(newTheme);
  applyTheme(newTheme);
  
  return newTheme;
};
