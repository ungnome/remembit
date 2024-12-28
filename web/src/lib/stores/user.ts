import { pb } from '$lib/services/pocketbase';
import { get, readonly, writable } from 'svelte/store';

export { currentUser, setName, changeEmail };

const _currentUser = writable(pb.authStore.record);
const _hasValidCredentials = writable(pb.authStore.isValid);

const currentUser = readonly(_currentUser);

pb.authStore.onChange(() => {
	_currentUser.set(pb.authStore.record);
	_hasValidCredentials.set(pb.authStore.isValid);
});

async function setName(newName: string) {
	const user = get(currentUser);
	await pb.collection('users').update(user!.id, { name: newName });
}

async function changeEmail(newEmail: string) {
	await pb.collection('users').requestEmailChange(newEmail);
}
