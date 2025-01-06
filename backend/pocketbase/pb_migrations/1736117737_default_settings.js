/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    // up
    let settings = app.settings();

    settings.meta.appName = 'remembit';
    settings.logs.maxDays = 5;
    settings.logs.logAuthId = true;
    settings.logs.logIP = false;

    app.save(settings);
});
