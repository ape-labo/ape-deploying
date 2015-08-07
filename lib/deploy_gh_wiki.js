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

var argx = require('argx'),
    fs = require('fs'),
    path = require('path'),
    execcli = require('execcli'),
    glob = require('glob'),
    async = require('async');

/** @lends deployWiki */
function deployWiki(src, url, options, callback) {
    var args = argx(arguments);
    src = args.shift('string');
    url = args.shfit('sring');
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    var clean = !!options.clean,
        commitMsg = options.commitMsg || 'Update wiki.',
        tmpDir = options.tmpDir || 'tmp';

    var localRepo = path.resolve(tmpDir, 'deploy-wiki-' + new Date().getTime());
    async.series([
        function (callback) {
            mkdirp(path.dirname(localRepo), callback);
        },
        function (callback) {
            execcli('git', ['clone', url, localRepo], callback);
        },
        function (callback) {
            if (clean) {
                var filenames = path.join(localRepo, '*.md');
                deployWiki.clean(filenames, callback);
            } else {
                callback(null);
            }
        },
        function (callback) {
            deployWiki.copy(src, localRepo, callback);
        },
        function (callback) {
            deployWiki.pushgit(commitMsg, callback);
        }
    ], callback);
}

deployWiki.clean = function (filenames, callback) {
    async.waterfall([
        function (callback) {
            glob(filenames, callback);
        },
        function (filenames, callback) {
            async.each(filenames, fs.unlink, callback);
        }
    ], callback);
};

deployWiki.copy = function (src, destDir, callback) {
    async.waterfall([
        function (callback) {
            glob(src, callback);
        },
        function (src, callback) {
            async.each(src, function (src, callback) {
                var dest = path.resolve(destDir, path.basename(src));
                copyFile(src, dest, callback);
            }, callback);
        }
    ], callback);
};

deployWiki.pushgit = function (dirname, msg, callback) {
    var here = process.cwd();
    process.chdir(dirname);
    async.series([
        function (callback) {
            execcli('git', ['add', '.', '-A'], callback);
        },
        function (callback) {
            execcli('git', ['commit', '-am', msg], callback);
        },
        function (callback) {
            execcli('git', ['push'], callback);
        },
        function (callback) {
            process.chdir(here);
            callback(null);
        }
    ], callback);
};

function copyFile(src, dest, callback) {
    var aborted = false;

    var rd = fs.createReadStream(src);
    rd.on("error", function (err) {
        done(err);
    });
    var wr = fs.createWriteStream(dest);
    wr.on("error", function (err) {
        done(err);
    });
    wr.on("close", function (ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!aborted) {
            callback(err);
            aborted = true;
        }
    }
}