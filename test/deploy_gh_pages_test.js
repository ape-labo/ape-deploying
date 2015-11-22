/**
 * Test case for deployGhPages.
 * Runs with nodeunit.
 */
"use strict";

const deployGhPages = require('../lib/deploy_gh_pages.js');

exports['Deploy with invalid dir'] = function (test) {

    deployGhPages('foo/bar/__invalid_dir', (err) => {
        test.ok(!!err);
        test.done();
    });
};

