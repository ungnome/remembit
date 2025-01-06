/// <reference path="../pb_data/types.d.ts" />
migrate(
    (app) => {
        // up
        let users = app.findCollectionByNameOrId('_pb_users_auth_');

        users.createRule = '@request.body.id:isset = false';

        app.save(users);
    },
    (app) => {
        // down
        let users = app.findCollectionByNameOrId('_pb_users_auth_');

        users.createRule = '';

        app.save(users);
    }
);
