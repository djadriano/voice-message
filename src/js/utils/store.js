import { writable } from 'svelte/store';
import { USER_STORE, RECORDER_STORE } from './constants';

export const user = writable(USER_STORE);
export const recorder = writable(RECORDER_STORE);
