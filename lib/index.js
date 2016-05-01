/**
 * Deploying module of ape framework.
 * @module ape-deploying
 */

'use strict'

module.exports = {
  get deployGhPages () { return require('./deploy_gh_pages') },
  get deployGhWiki () { return require('./deploy_gh_wiki') }
}
