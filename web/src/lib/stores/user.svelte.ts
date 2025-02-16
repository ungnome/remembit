import { pb } from '$lib/services/pocketbase';

class User {
	id = $state('');
	name = $state('');
	email = $state('');
	gravatar = $state('https://gravatar.com/avatar/000000000?s=200&d=retro');
	password = $state('');
	isValid = $state(false);

	reset() {
		this.name = '';
		this.email = '';
		this.isValid = false;
	}

	async deleteAccount() {
		await pb.collection('users').delete(this.id);
	}

	async updateName(newName: string) {
		await pb.collection('users').update(this.id, { name: newName });
	}

	// TODO: Fix this!
	async updateEmail(newEmail: string) {
		await pb.collection('users').requestEmailChange(newEmail);
	}
}

async function getGravatarUrl(email: string) {
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

	return `https://gravatar.com/avatar/${hashString}?s=200&d=retro`;
}

const user = new User();

pb.authStore.onChange(async () => {
	if (pb.authStore.record) {
		user.id = pb.authStore.record.id;
		user.name = pb.authStore.record.name;
		user.email = pb.authStore.record.email;
		user.gravatar = await getGravatarUrl(pb.authStore.record.email);
		user.isValid = pb.authStore.isValid;
	}
});

pb.collection('users').authRefresh();

export default user;
