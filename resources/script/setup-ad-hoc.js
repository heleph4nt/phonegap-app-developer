/**
 * Setup an Ad-Hoc release.
 *
 * Ad-Hoc releases are used for nightly builds and use
 * a different ID.
 */

/*!
 * Module dependencies.
 */

 var fs = require('fs-extra'),
     path = require('path');

/*!
 * Create the Cordova directories that are ignored by version control.
 */

var projectRoot = require('app-root-path').path;
var configPath = path.join(projectRoot, 'config.xml');

fs.copy(configPath, path.join(projectRoot, 'config-backup.xml'), function(err) {
    if (err) throw err;

    fs.readFile(configPath, 'utf8', function(err, data) {
        if (err) throw err;

        // updating app id for nightly builds
        data = data.replace('com.adobe.phonegap.app', 'com.phonegap.app.ad-hoc');

        // replacing app name
        data = data.replace('<name>PhoneGap</name>', '<name>PG Nightly</name>');

        fs.writeFile(configPath, data);
    });
}) ;
