/**
 * Deploy GitHub pages, using git subtree commands.
 * @memberof ape-deploying/lib
 * @function deployGhPages
 * @param {string} dirname - Dirname to deploy.
 * @param {object} [options] - Optional settings.
 * @param {string} [options.remote='origin'] - Remote repo name.
 * @param {function} [callback] - Callback when done.
 */

"use strict";

var argx = require('argx'),
    fs = require('fs'),
    execcli = require('execcli');

/** @lends deployGhPages */
function deployGhPages(dirname, options, callback) {
    var args = argx(arguments);
    dirname = args.shift('string');
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    var remote = options.remote || 'origin';

    fs.exists(dirname, function (exists) {
        if (!exists) {
            callback(new Error('Directory not exists: ' + dirname));
            return;
        }
        execcli('git', [
            'subtree', 'push',
            '--prefix=' + dirname,
            remote, 'gh-pages'
        ], callback);
    });


}

module.exports = deployGhPages;
