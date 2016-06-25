#!/usr/bin/env node

/**
 * Deploy project.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const childProcess = require('child_process')
const co = require('co')
const apeDeploying = require('../lib')

apeTasking.runTasks('deploy', [
  () => co(function * () {
    let url = String(childProcess.execSync('git config --get remote.origin.url')).trim()
    return yield apeDeploying.deployGhWiki('doc/wiki', url.replace(/\.git$/, '.wiki.git'))
  })
], true)
