import { pb } from '$lib/services/pocketbase';
import { readonly, writable } from 'svelte/store';

export { currentUser, currentUserIsValid, gravatar };

const _currentUser = writable(pb.authStore.record);
const currentUser = readonly(_currentUser);

const _hasValidCredentials = writable(pb.authStore.isValid);
const currentUserIsValid = readonly(_hasValidCredentials);

const _gravatar = writable('');
const gravatar = readonly(_gravatar);

pb.authStore.onChange(() => {
	_currentUser.set(pb.authStore.record);
	_hasValidCredentials.set(pb.authStore.isValid);

	getEmailHash(pb.authStore.record?.email)
		.then((hash) => {
			_gravatar.set(`https://gravatar.com/avatar/${hash}?s=200&d=retro`);
		})
		.catch(() => '');
});

async function getEmailHash(email: string) {
	// pulled from: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

	// encode as (utf-8) Uint8Array
	const encoder = new TextEncoder();
	const data = encoder.encode(email);

	// hash email address, returned as an Array buffer
	const hashArrayBuffer = await window.crypto.subtle.digest('SHA-256', data);

	// convert ArrayBuffer to byte array
	const hashByteArray = Array.from(new Uint8Array(hashArrayBuffer));

	// convert byte array to hex string
	const hashString = hashByteArray.map((b) => b.toString(16).padStart(2, '0')).join('');

	return hashString;
}
