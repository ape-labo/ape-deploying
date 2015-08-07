/**
 * Test case for deployGhWiki.
 * Runs with nodeunit.
 */

var deployGhWiki = require('../lib/deploy_gh_wiki.js');

exports['Deploy gh wiki'] = function (test) {
    test.ok(deployGhWiki);
    test.done();
};

