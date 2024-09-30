import { pb, currentUser } from '$lib/pocketbase';
import { readonly, writable, get } from 'svelte/store';
import type { BookmarksResponse } from '$lib/pocketbase-types';

const _bookmarks = writable(<BookmarksResponse[]>[], () => {
	refreshBookmarks();
});
export const bookmarks = readonly(_bookmarks);

export async function createBookmark(name: string, url: string) {
	const _user = get(currentUser);

	await pb.collection('bookmarks').create({
		owner: _user?.id,
		name: name,
		url: url
	});

	await refreshBookmarks();
}

export async function updateBookmark(id: string, name: string, url: string) {
	const _user = get(currentUser);

	await pb.collection('bookmarks').update(id, {
		owner: _user?.id,
		name: name,
		url: url
	});

	await refreshBookmarks();
}

export async function deleteBookmark(id: string) {
	await pb.collection('bookmarks').delete(id);
	await refreshBookmarks();
}

async function refreshBookmarks() {
	const resultList = await pb.collection('bookmarks').getFullList();
	_bookmarks.set(resultList);
}
