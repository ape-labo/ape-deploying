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
const path = require('path')
const colorprint = require('colorprint')
const co = require('co')
const childProcess = require('child_process')
const gitHelper = require('./helpers/git_helper')
const fsHelper = require('./helpers/fs_helper')

/** @lends deployGhPages */
function deployGhPages (src, url, options = {}) {
  let args = argx(arguments)
  src = args.shift('string')
  url = args.shift('string') || childProcess.execSync('git config --get remote.origin.url').toString().trim()

  if (args.pop('function')) {
    throw new Error('[ape-deploying] Callback is no longer supported. Use promise instead.')
  }

  let { branch, remote, commitMsg, clean = false } = options
  remote = remote || 'origin'
  branch = branch || 'gh-pages'
  commitMsg = commitMsg || 'Deploy Github pages'

  let tmpDir = options.tmpDir || 'tmp'

  let localRepo = path.resolve(tmpDir, `deploy-gh-pages-${new Date().getTime()}`)
  return co(function * () {
    let exists = yield fsHelper.existsAsync(src)
    if (!exists) {
      throw new Error(`Directory not exists: ${src}`)
    }
    if(clean){
      yield gitHelper.destroyRemoteBranch(remote, branch)
    }
    yield fsHelper.copyDir(src, localRepo)
    yield gitHelper.initGit(localRepo, url, { remote, branch })
    yield gitHelper.pushGit(localRepo, commitMsg, { remote, branch })
    yield fsHelper.rimrafAsync(localRepo)
  })
}

module.exports = deployGhPages
