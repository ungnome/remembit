import PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export { pb };
export type { Bookmark };

const pb = new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;

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
