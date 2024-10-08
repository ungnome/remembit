import PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';
import { env } from '$env/dynamic/public';
import { writable } from 'svelte/store';

export { pb, currentUser };
export type { Bookmark };

const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL) as TypedPocketBase;
const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});

interface Bookmark {
	id: string;
	created: string;
	updated: string;
	name: string;
	url: string;
}

interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService;
	collection(idOrName: 'bookmarks'): RecordService<Bookmark>;
}
