import { pb, type Bookmark } from '$lib/services/pocketbase';
import user from '$lib/stores/user.svelte';
import { get, writable, readonly, derived } from 'svelte/store';

export {
	bookmarks,
	bookmarksFiltered,
	searchString,
	createBookmark,
	updateBookmark,
	deleteBookmark
};

const _bookmarks = writable(<Bookmark[]>[], () => {
	refreshBookmarks();
});
const bookmarks = readonly(_bookmarks);
const searchString = writable('');
const bookmarksFiltered = derived([bookmarks, searchString], ([$bookmarks, $searchString]) =>
	filterBookmarks($bookmarks, $searchString)
);

function filterBookmarks(bookmarks: Bookmark[], searchString: string) {
	return bookmarks.filter((bookmark) => {
		const searchTargets = [bookmark.name, bookmark.url];
		const results = searchTargets.map((target) => target.toLowerCase().includes(searchString));
		return results.includes(true);
	});
}

async function createBookmark(name: string, url: string) {
	await pb.collection('bookmarks').create({
		owner: user.id,
		name: name,
		url: url
	});

	await refreshBookmarks();
}

async function updateBookmark(id: string, name: string, url: string) {
	await pb.collection('bookmarks').update(id, {
		owner: user.id,
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
