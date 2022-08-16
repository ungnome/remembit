import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';
import pick from 'just-pick';

type Bookmark = {
  id?: string;
  name: string;
  url: string;
  tags: Array<string>;
  created?: string;
  updated?: string;
};

type BookmarksState = {
  bookmarks: Array<Bookmark>;
};

function getRange(cursor: number) {
  const limit = 2;
  const from = cursor ? cursor + 1 : 0;
  const to = from + limit;
  return { from, to };
}

const useBookmarks = defineStore('bookmarks', {
  state: (): BookmarksState => {
    return {
      bookmarks: []
    };
  },

  actions: {
    createBookmark(bookmark: Bookmark) {
      const newBookmark = pick(bookmark, ['name', 'url', 'tags']);
      return supabase.from('bookmark').insert(newBookmark);
    },

    updateBookmark(bookmark: Bookmark) {
      const updates = pick(bookmark, ['name', 'url', 'tags']);
      return supabase.from('bookmark').update(updates).match({ id: bookmark.id });
    },

    deleteBookmark(bookmark: Bookmark) {
      return supabase.from('bookmark').delete().match({ id: bookmark.id });
    },

    async fetchBookmarks() {
      // get total number of bookmarks in db
      const { count: totalRows } = await supabase
        .from('bookmarks_view')
        .select('*', { count: 'exact', head: true });

      // if there are bookmarks, get them
      if (totalRows) {
        // set position in table
        let moreRecords = true;
        let cursor = 0;

        // clear existing state
        this.$reset();

        // get bookmarks from db
        while (moreRecords) {
          // determine range of records to retreive, inclusive
          const { to, from } = getRange(cursor);

          // retrieve records from db
          const { data, error } = await supabase
            .from('bookmarks_view')
            .select('*')
            .range(from, to);

          // handle error and exit loop
          if (error) {
            console.error(error);
            moreRecords = false;
          }

          // add bookmarks to state and set cursor to end of range retreived
          if (data) {
            this.bookmarks.push(...data);
            moreRecords = to < totalRows ? true : false;
            cursor = to;
          }
        }
      }
    }
  },

  getters: {
    allTags: (state) => {
      const tagList: Array<string> = [];

      state.bookmarks.forEach((bookmark) => {
        bookmark.tags.forEach((tag) => {
          tagList.includes(tag) ? true : tagList.push(tag);
        });
      });

      return tagList;
    },

    untaggedBookmarks: (state) => {
      return state.bookmarks.filter((bookmark) => {
        return bookmark.tags.length === 0;
      });
    }
  }
});

export { useBookmarks };
