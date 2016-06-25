/**
 * Test case for deployGhPages.
 * Runs with mocha.
 */
'use strict'

const deployGhPages = require('../lib/deploy_gh_pages.js')
const injectmock = require('injectmock')
const assert = require('assert')
const co = require('co')

describe('deploy gh pages', function () {
  after(() => co(function * () {
    injectmock.restoreAll()
  }))

  it('Deploy with invalid dir', () => co(function * () {
    try {
      yield deployGhPages('foo/bar/__invalid_dir')
    } catch (err) {
      assert.ok(!!err)
    }
  }))
})

/* global before, after, describe, it */
