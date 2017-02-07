/**
 * Deploying module of ape framework.
 * @module ape-deploying
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get deployGhPages () { return d(require('./deploy_gh_pages')) },
  get deployGhWiki () { return d(require('./deploy_gh_wiki')) }
}
