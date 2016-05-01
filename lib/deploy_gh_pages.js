/**
 * Deploy GitHub pages, using git subtree commands.
 * @memberof ape-deploying/lib
 * @function deployGhPages
 * @param {string} dirname - Dirname to deploy.
 * @param {object} [options] - Optional settings.
 * @param {string} [options.remote='origin'] - Remote repo name.
 * @returns {Promise}
 */

'use strict'

const argx = require('argx')
const fs = require('fs')
const co = require('co')
const execcli = require('execcli')

let warnCallback = () => '[ape-deploying] Callback is now deprecated. Use promise interface instead.'

/** @lends deployGhPages */
function deployGhPages (dirname, options) {
  let args = argx(arguments)
  dirname = args.shift('string')
  let callback = args.pop('function')
  options = args.pop('object') || {}

  let remote = options.remote || 'origin'
  return co(function * () {
    let exists = yield new Promise((resolve) =>
      fs.exists(dirname, (exists) => resolve(exists))
    )
    if (!exists) {
      throw new Error('Directory not exists: ' + dirname)
    }
    return yield execcli('git', [
      'subtree', 'push',
      '--prefix=' + dirname,
      remote, 'gh-pages'
    ])
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

module.exports = deployGhPages
