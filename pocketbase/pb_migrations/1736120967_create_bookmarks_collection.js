/// <reference path="../pb_data/types.d.ts" />
migrate(
    (app) => {
        let bookmarksCollection = new Collection({
            type: 'base',
            name: 'bookmarks',
            listRule: '@request.auth.id != "" && owner = @request.auth.id',
            viewRule: '@request.auth.id != "" && owner = @request.auth.id',
            createRule:
                '@request.auth.id != "" && @request.auth.id = @request.body.owner && @request.body.id:isset = false',
            updateRule: '@request.auth.id != "" && owner = @request.auth.id',
            deleteRule: '@request.auth.id != "" && owner = @request.auth.id',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true
                },
                {
                    name: 'owner',
                    type: 'relation',
                    required: true,
                    collectionId: '_pb_users_auth_',
                    cascadeDelete: true,
                    maxSelect: 1
                },
                {
                    name: 'tags',
                    type: 'json'
                },
                {
                    name: 'created',
                    onCreate: true,
                    onUpdate: false,
                    type: 'autodate'
                },
                {
                    name: 'updated',
                    onCreate: true,
                    onUpdate: true,
                    type: 'autodate'
                }
            ]
        });

        app.save(bookmarksCollection);
    },
    (app) => {
        let bookmarksCollection = app.findCollectionByNameOrId('bookmarks');

        app.delete(bookmarksCollection);
    }
);
