/**
 * Test case for deployGhWiki.
 * Runs with nodeunit.
 */
"use strict";

const deployGhWiki = require('../lib/deploy_gh_wiki.js');

exports['Deploy gh wiki with invalid url.'] = function (test) {
    deployGhWiki('foo/bar/*.md', "foo/bar", (err) => {
        test.ok(!!err);
        test.done();
    });
};

