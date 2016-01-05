#!/usr/bin/env node
"use strict";

const apeDeploying = require('ape-deploying');

const wikiUrl = 'https://github.com/okunishinishi/node-coz.wiki.git';
apeDeploying.deployGhWiki('doc/wiki/*.md', wikiUrl, {
    clean: true
}, (err) => {
    /*...*/
});