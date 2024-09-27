import { writable } from 'svelte/store';

// Check if there's a saved theme preference in localStorage
const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
export const theme = writable(savedTheme || 'dark');

// Update localStorage when the theme changes
theme.subscribe(value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', value);
  }
});