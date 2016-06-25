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
const filecopy = require('filecopy')
const expandglob = require('expandglob')
const path = require('path')
const colorprint = require('colorprint')
const co = require('co')
const gitHelper = require('./helpers/git_helper')
const fsHelper = require('./helpers/fs_helper')

/** @lends deployWiki */
function deployWiki (src, url, options) {
  let args = argx(arguments)
  src = args.shift('string')
  url = args.shift('string')
  if (args.pop('function')) {
    throw new Error('[ape-deploying] Callback is no longer supported. Use promise instead.')
  }
  options = args.pop('object') || {}

  let clean = !!options.clean
  let commitMsg = options.commitMsg || 'Update wiki.'
  let tmpDir = options.tmpDir || 'tmp'

  let localRepo = path.resolve(tmpDir, `deploy-wiki-${new Date().getTime()}`)
  return co(function * () {
    let exists = yield fsHelper.existsAsync(src)
    if (!exists) {
      throw new Error(`Directory not exists: ${src}`)
    }

    yield gitHelper.cloneTo(url, localRepo)

    if (clean) {
      yield fsHelper.cleancleanDir(localRepo, {
        ignore: '.git'
      })
    }

    yield fsHelper.copyDir(src, localRepo)
    let changed = yield gitHelper.hasChange(localRepo)
    if (changed) {
      yield gitHelper.pushGit(localRepo, commitMsg)
    } else {
      colorprint.warn('Nothing to push.')
    }
    yield fsHelper.rimrafAsync(localRepo)
  })
}

module.exports = deployWiki
