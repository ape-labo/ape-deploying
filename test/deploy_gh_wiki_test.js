/**
 * Test case for deployGhWiki.
 * Runs with mocha.
 */
'use strict'

const gitHelper = require('../lib/helpers/git_helper')
const deployGhWiki = require('../lib/deploy_gh_wiki.js')
const injectmock = require('injectmock')
const assert = require('assert')
const co = require('co')

describe('deploy-git-wiki', function () {
  before(() => co(function * () {
    injectmock(gitHelper, 'git', () => {
      return Promise.resolve(true)
    })
  }))
  after(() => co(function * () {
    injectmock.restoreAll()
  }))

  it('Deploy gh wiki with invalid url.', () => co(function * () {
    try {
      yield deployGhWiki('foo/bar/*.md', 'foo/bar')
    } catch (e) {
      assert.ok(e)
    }
  }))
})

/* global before, after, describe, it */
