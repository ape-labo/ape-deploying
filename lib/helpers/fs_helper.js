/**
 * Helper for fs
 */
'use strict'

const filecopy = require('filecopy')
const expandglob = require('expandglob')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const co = require('co')

module.exports = Object.assign(exports, {
  cleanDir (dirname, options = {}) {
    return co(function * () {
      let pattern = path.join(dirname, '**/*.*')
      let ignore = { options }
      let filenames = yield expandglob(pattern, { ignore })
      for (let filename of filenames) {
        yield new Promise((resolve, reject) =>
          fs.unlink(filename, (err) =>
            err ? reject(err) : resolve()
          )
        )
      }
    })
  },

  mkdirpAsync (dirname) {
    return new Promise((resolve, reject) =>
      mkdirp(dirname, (err) =>
        err ? reject(err) : resolve()
      )
    )
  },

  existsAsync (filename) {
    return new Promise((resolve) =>
      fs.exists(filename, (exists) => resolve(exists))
    )
  },

  rimrafAsync (dirname) {
    return new Promise((resolve, reject) =>
      rimraf(dirname, (err) =>
        err ? reject(err) : resolve()
      )
    )
  },

  copyDir (src, dest) {
    return co(function * () {
      let filenames = yield expandglob('**/*.*', {
        cwd: src
      })
      for (let filename of filenames) {
        yield filecopy(
          path.resolve(src, filename),
          path.resolve(dest, filename),
          { mkdirp: true }
        )
      }
    })
  }
})
