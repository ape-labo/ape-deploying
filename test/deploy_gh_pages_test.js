/**
 * Test case for deployGhPages.
 * Runs with mocha.
 */
'use strict'

const deployGhPages = require('../lib/deploy_gh_pages.js')
const assert = require('assert')

it('Deploy with invalid dir', (done) => {
  deployGhPages('foo/bar/__invalid_dir', (err) => {
    assert.ok(!!err)
    done()
  })
})

/* global it */
