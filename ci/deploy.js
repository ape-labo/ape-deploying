#!/usr/bin/env node

/**
 * Deploy project.
 */

'use strict'

process.chdir(__dirname + '/..');

const apeTasking = require('ape-tasking'),
    childProcess = require('child_process'),
    apeDeploying = require('../lib');

apeTasking.runTasks('deploy', [
    (callback) => {
        let url = String(childProcess.execSync('git config --get remote.origin.url')).trim();
        apeDeploying.deployGhWiki('doc/wiki', url.replace(/\.git$/, '.wiki.git'), callback);
    }
], true);