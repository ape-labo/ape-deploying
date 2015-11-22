/**
 * Deploy GitHub wiki.
 * @memberof ape-deploying/lib
 * @function deployWiki
 * @param {string} src - Source filename patter.
 * @param {string} url - Wiki git url.
 * @param {object} [options] - Optional settings.
 * @param {string} [options.tmpDir] - Template directory path.
 * @param {boolean} [options.clean] - Should clean existing wiki.
 * @param {string} [options.commitMsg] - Message to commit.
 * @param {function} callback - Callback when done.
 */

"use strict";

const argx = require('argx'),
    fs = require('fs'),
    filecopy = require('filecopy'),
    path = require('path'),
    execcli = require('execcli'),
    glob = require('glob'),
    mkdirp = require('mkdirp'),
    async = require('async');

/** @lends deployWiki */
function deployWiki(src, url, options, callback) {
    let args = argx(arguments);
    src = args.shift('string');
    url = args.shift('string');
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    let clean = !!options.clean,
        commitMsg = options.commitMsg || 'Update wiki.',
        tmpDir = options.tmpDir || 'tmp';

    let localRepo = path.resolve(tmpDir, 'deploy-wiki-' + new Date().getTime());
    async.series([
        (callback) => {
            mkdirp(path.dirname(localRepo), callback);
        },
        (callback) => {
            execcli('git', ['clone', url, localRepo], callback);
        },
        (callback) => {
            if (clean) {
                let filenames = path.join(localRepo, '*.md');
                deployWiki.clean(filenames, callback);
            } else {
                callback(null);
            }
        },
        (callback) => {
            filecopy(src, localRepo, callback);
        },
        (callback) => {
            deployWiki.pushgit(localRepo, commitMsg, callback);
        }
    ], callback);
}

deployWiki.clean = function (filenames, callback) {
    async.waterfall([
        (callback) => {
            glob(filenames, callback);
        },
        (filenames, callback) => {
            async.each(filenames, fs.unlink, callback);
        }
    ], callback);
};


deployWiki.pushgit = function (dirname, msg, callback) {
    var here = process.cwd();
    process.chdir(dirname);
    async.series([
        (callback) => {
            execcli('git', ['add', '.', '-A'], callback);
        },
        (callback) => {
            execcli('git', ['commit', '-am', msg], callback);
        },
        (callback) => {
            execcli('git', ['push'], callback);
        },
        (callback) => {
            process.chdir(here);
            callback(null);
        }
    ], callback);
};

module.exports = deployWiki;