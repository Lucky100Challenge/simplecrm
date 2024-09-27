import { writable } from 'svelte/store';

export const money = writable({ dirty: 1000000, clean: 0 });
export const suspicionLevel = writable(0);
export const upgrades = writable({
  'real-estate': 0,
  'casino': 0,
  'offshore': 0,
  'security': 0
});
export const gameTime = writable(0);