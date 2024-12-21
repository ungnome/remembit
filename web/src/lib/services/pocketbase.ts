import PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';
import { env } from '$env/dynamic/public';

export { pb };
export type { Bookmark };

const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL) as TypedPocketBase;

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
