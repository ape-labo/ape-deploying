/**
 * Deploy GitHub wiki.
 * @memberof ape-deploying/lib
 * @function deployWiki
 * @param {string} src - Source filename pattern.
 * @param {string} url - Wiki git url.
 * @param {object} [options] - Optional settings.
 * @param {string} [options.tmpDir] - Template directory path.
 * @param {boolean} [options.clean] - Should clean existing wiki.
 * @param {string} [options.commitMsg] - Message to commit.
 * @param {function} callback - Callback when done.
 */

'use strict'

const argx = require('argx'),
  fs = require('fs'),
  rimraf = require('rimraf'),
  filecopy = require('filecopy'),
  expandglob = require('expandglob'),
  path = require('path'),
  childProcess = require('child_process'),
  execcli = require('execcli'),
  colorprint = require('colorprint'),
  mkdirp = require('mkdirp'),
  async = require('async');

/** @lends deployWiki */
function deployWiki (src, url, options, callback) {
  let args = argx(arguments);
  src = args.shift('string');
  url = args.shift('string');
  callback = args.pop('function') || argx.noop;
  options = args.pop('object') || {};

  let clean = !!options.clean;
  let commitMsg = options.commitMsg || 'Update wiki.';
  let tmpDir = options.tmpDir || 'tmp';

  let localRepo = path.resolve(tmpDir, 'deploy-wiki-' + new Date().getTime());
  async.series([
    (callback) => {
      mkdirp(path.dirname(localRepo), callback);
    },
    (callback) => {
      execcli('git', [ 'clone', url, localRepo ], callback);
    },
    (callback) => {
      if (clean) {
        let filenames = path.join(localRepo, '**/*.*');
        deployWiki.clean(filenames, callback);
      } else {
        callback(null);
      }
    },
    (callback) => {
      fs.exists(src, (exists) => {
        if (exists) {
          async.waterfall([
            (callback) => {
              expandglob('**/*.*', {
                cwd: src
              }, callback);
            },
            (filenames, callback) => {
              async.eachSeries(filenames, (filename, callback) => {
                filecopy(
                  path.resolve(src, filename),
                  path.resolve(localRepo, filename),
                  callback);
              }, callback);
            }
          ], callback);

        } else {
          filecopy(src, localRepo, callback);
        }
      });
    },
    (callback) => {
      deployWiki.hasChange(localRepo, (changed) => {
        if (changed) {
          deployWiki.pushgit(localRepo, commitMsg, callback);
        } else {
          colorprint.warn('Nothing to push.');
          callback(null);
        }
      });
    },
    (callback) => {
      rimraf(localRepo, callback);
    }
  ], callback);
}

deployWiki.clean = function (filenames, callback) {
  async.waterfall([
    (callback) => {
      expandglob(filenames, {
        ignore: '.git'
      }, callback);
    },
    (filenames, callback) => {
      async.each(filenames, fs.unlink, callback);
    }
  ], callback);
};

deployWiki.hasChange = function (dirname, callback) {
  let here = process.cwd();
  process.chdir(dirname);
  childProcess.exec('git status --porcelain', (err, stdOut) => {
    let changed = !err && !!stdOut;
    process.chdir(here);
    callback(changed);
  });
};
deployWiki.pushgit = function (dirname, msg, callback) {
  let here = process.cwd();
  process.chdir(dirname);
  async.series([
    (callback) => {
      execcli('git', [ 'add', '.', '-A' ], callback);
    },
    (callback) => {
      execcli('git', [ 'commit', '-am', msg ], callback);
    },
    (callback) => {
      execcli('git', [ 'push' ], callback);
    },
    (callback) => {
      process.chdir(here);
      callback(null);
    }
  ], callback);
};

module.exports = deployWiki;