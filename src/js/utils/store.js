import { writable } from 'svelte/store';

export const user = writable({
  logged: false,
  photoURL: null,
  displayName: null,
  email: null,
});
