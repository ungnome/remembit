import { pb } from '$lib/services/pocketbase';
import { currentUser } from '$lib/stores/user';
import { readonly, writable, get } from 'svelte/store';
import type { Bookmark } from '$lib/services/pocketbase';

export { bookmarks, createBookmark, updateBookmark, deleteBookmark };

const _bookmarks = writable(<Bookmark[]>[], () => {
	refreshBookmarks();
});

const bookmarks = readonly(_bookmarks);

async function createBookmark(name: string, url: string) {
	const _user = get(currentUser);

	await pb.collection('bookmarks').create({
		owner: _user!.id,
		name: name,
		url: url
	});

	await refreshBookmarks();
}

async function updateBookmark(id: string, name: string, url: string) {
	const _user = get(currentUser);

	await pb.collection('bookmarks').update(id, {
		owner: _user!.id,
		name: name,
		url: url
	});

	await refreshBookmarks();
}

async function deleteBookmark(id: string) {
	await pb.collection('bookmarks').delete(id);
	await refreshBookmarks();
}

async function refreshBookmarks() {
	const resultList = await pb.collection('bookmarks').getFullList();
	_bookmarks.set(resultList);
}
