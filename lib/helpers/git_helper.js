/**
 * Helper for git
 */
'use strict'

const co = require('co')
const path = require('path')
const execcli = require('execcli')
const childProcess = require('child_process')
const { EOL } = require('os')
const fsHelper = require('./fs_helper')

module.exports = Object.assign(exports, {
  hasChange (dirname) {
    let here = process.cwd()
    process.chdir(dirname)
    return co(function * () {
      let stdOut = childProcess.execSync('git status --porcelain').toString().trim()
      let changed = !!stdOut
      process.chdir(here)
      return changed
    })
  },

  initGit (dirname, url, options = {}) {
    let { git } = exports
    let { branch, remote } = options
    let here = process.cwd()
    return co(function * () {
      process.chdir(dirname)
      yield git('init')
      if (branch) {
        yield git('checkout', '-b', branch)
      }
      yield git('remote', 'add', remote, url)
      process.chdir(here)
    })
  },

  pushGit (dirname, msg, options = {}) {
    let { git } = exports
    let here = process.cwd()
    process.chdir(dirname)
    let { remote, branch, force = false } = options
    return co(function * () {
      yield git('add', '.', '-A')
      yield git('commit', '-am', msg)
      {
        let args = [ 'push' ]
        if (remote) {
          args.push(remote)
        }
        if (branch) {
          args.push(branch)
        }
        if (force) {
          args.push('--force')
        }
        yield git(...args)
      }
      process.chdir(here)
    })
  },

  cloneTo (url, localRepo, options = {}) {
    let { git } = exports
    return co(function * () {
      yield fsHelper.mkdirpAsync(path.dirname(localRepo))
      let { branch } = options
      if (branch) {
        yield git('clone', url, '--branch', branch, '--single-branch', localRepo)
      } else {
        yield git('clone', url, localRepo)
      }
    })
  },

  destroyRemoteBranch (remote, branch) {
    let { git } = exports
    return co(function * () {
      let remoteBranches = childProcess.execSync(`git ls-remote --heads ${remote}`)
        .toString()
        .trim()
        .split(EOL)
        .filter((line) => !!line)
        .map((line) => line.trim().split(/[\s\t]/).pop().trim())
      let hasBranch = !!~remoteBranches.indexOf(`refs/heads/${branch}`)
      if (hasBranch) {
        yield git('push', remote, `:${branch}`)
      } else {
        console.log(`${[ remote, branch ].join('/')} does not exist.`)
      }
    })
  },

  git (...args) {
    return execcli('git', [].concat(args))
  }

})
