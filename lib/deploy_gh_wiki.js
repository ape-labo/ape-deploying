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
 * @returns {Promise}
 */

'use strict'

const argx = require('argx')
const fs = require('fs')
const rimraf = require('rimraf')
const filecopy = require('filecopy')
const expandglob = require('expandglob')
const path = require('path')
const childProcess = require('child_process')
const execcli = require('execcli')
const colorprint = require('colorprint')
const mkdirp = require('mkdirp')
const co = require('co')

let warnCallback = () => '[ape-deploying] Callback is now deprecated. Use promise interface instead.'

/** @lends deployWiki */
function deployWiki (src, url, options) {
  let args = argx(arguments)
  src = args.shift('string')
  url = args.shift('string')
  let callback = args.pop('function')
  options = args.pop('object') || {}

  let clean = !!options.clean
  let commitMsg = options.commitMsg || 'Update wiki.'
  let tmpDir = options.tmpDir || 'tmp'

  let localRepo = path.resolve(tmpDir, 'deploy-wiki-' + new Date().getTime())
  return co(function * () {
    yield new Promise((resolve, reject) =>
      mkdirp(path.dirname(localRepo), (err) =>
        err ? reject(err) : resolve()
      )
    )
    yield execcli('git', [ 'clone', url, localRepo ])

    if (clean) {
      let filenames = path.join(localRepo, '**/*.*')
      yield deployWiki.clean(filenames)
    }
    let exists = yield new Promise((resolve) =>
      fs.exists(src, (exists) => resolve(exists))
    )
    if (exists) {
      let filenames = yield expandglob('**/*.*', {
        cwd: src
      })
      for (let filename of filenames) {
        yield filecopy(
          path.resolve(src, filename),
          path.resolve(localRepo, filename)
        )
      }
    } else {
      yield filecopy(src, localRepo)
    }
    let changed = yield deployWiki.hasChange(localRepo)
    if (changed) {
      yield deployWiki.pushgit(localRepo, commitMsg)
    } else {
      colorprint.warn('Nothing to push.')

      yield new Promise((resolve, reject) =>
        rimraf(localRepo, (err) =>
          err ? reject(err) : resolve()
        )
      )
    }
  }).then((result) => {
    if (callback) {
      warnCallback()
      callback(null, result)
    }
    return result
  }).catch((err) => {
    if (callback) {
      warnCallback()
      callback(err)
    }
    return Promise.reject(err)
  })
}

deployWiki.clean = function (pattern) {
  return co(function * () {
    let filenames = yield expandglob(pattern, {
      ignore: '.git'
    })
    for (let filename of filenames) {
      yield new Promise((resolve, reject) =>
        fs.unlink(filename, (err) =>
          err ? reject(err) : resolve()
        )
      )
    }
  })
}

deployWiki.hasChange = function (dirname) {
  let here = process.cwd()
  process.chdir(dirname)
  return co(function * () {
    let stdOut = new Promise((resolve, reject) =>
      childProcess.exec('git status --porcelain', (err, stdOut) =>
        err ? reject(err) : resolve(stdOut)
      )
    )
    let changed = !!stdOut
    process.chdir(here)
    return changed
  })
}

deployWiki.pushgit = function (dirname, msg) {
  let here = process.cwd()
  process.chdir(dirname)
  return co(function * () {
    yield execcli('git', [ 'add', '.', '-A' ])
    yield execcli('git', [ 'commit', '-am', msg ])
    yield execcli('git', [ 'push' ])
    process.chdir(here)
  })
}

module.exports = deployWiki
