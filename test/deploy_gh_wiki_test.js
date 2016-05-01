/**
 * Test case for deployGhWiki.
 * Runs with mocha.
 */
'use strict'

const deployGhWiki = require('../lib/deploy_gh_wiki.js')
const assert = require('assert')

it('Deploy gh wiki with invalid url.', (done) => {
  deployGhWiki('foo/bar/*.md', 'foo/bar', (err) => {
    assert.ok(!!err)
    done()
  })
})

/* global it */
