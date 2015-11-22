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

const argx = require('argx'),
    fs = require('fs'),
    execcli = require('execcli');

/** @lends deployGhPages */
function deployGhPages(dirname, options, callback) {
    let args = argx(arguments);
    dirname = args.shift('string');
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    let remote = options.remote || 'origin';

    fs.exists(dirname, (exists) => {
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
