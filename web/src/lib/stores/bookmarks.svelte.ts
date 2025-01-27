import { pb } from '$lib/services/pocketbase';
import user from '$lib/stores/user.svelte';

class Bookmark {
	constructor(input: { id: string; name: string; url: string; created: string; updated: string }) {
		this.id = input.id;
		this.name = input.name;
		this.url = input.url;
		this.created = input.created;
		this.updated = input.updated;
	}

	id: string;
	name: string;
	url: string;
	created: string;
	updated: string;

	async delete() {
		await pb.collection('bookmarks').delete(this.id);
	}

	async update(input: { name?: string; url?: string }) {
		await pb.collection('bookmarks').update(this.id, input);
	}
}

class BookmarkList {
	filter: string = $state('');
	all: Bookmark[] = $state([]);

	filtered = $derived.by(() => {
		return this.all.filter((bookmark) => {
			const searchTargets = [bookmark.name, bookmark.url];
			const results = searchTargets.map((target) => target.toLowerCase().includes(this.filter));
			return results.includes(true);
		});
	});

	async create(input: { name: string; url: string }) {
		const newBookmark = { owner: user.id, ...input };
		await pb.collection('bookmarks').create(newBookmark);
	}

	async refresh() {
		const pbBookmarks = await pb.collection('bookmarks').getFullList();
		this.all = [];

		pbBookmarks.forEach((pbBookmark) => {
			this.all.push(
				new Bookmark({
					id: pbBookmark.id,
					name: pbBookmark.name,
					url: pbBookmark.url,
					created: pbBookmark.created,
					updated: pbBookmark.updated
				})
			);
		});
	}

	reset() {
		this.filter = '';
		this.all = [];
	}
}

const bookmarks = new BookmarkList();

export default bookmarks;
export { bookmarks, Bookmark };
