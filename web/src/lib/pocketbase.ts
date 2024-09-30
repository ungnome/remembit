import type { TypedPocketBase } from '$lib/pocketbase-types';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';
import { writable } from 'svelte/store';

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL) as TypedPocketBase;
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});
