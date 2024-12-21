import { pb } from '$lib/services/pocketbase';
import { readonly, writable } from 'svelte/store';

export { currentUser };

const _currentUser = writable(pb.authStore.record);
const currentUser = readonly(_currentUser);

pb.authStore.onChange(() => {
	_currentUser.set(pb.authStore.record);
});

pb.authStore.onChange
