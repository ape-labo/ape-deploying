#!/usr/bin/env node

var apeDeploying = require('ape-deploying');

var wikiUrl = 'https://github.com/okunishinishi/node-coz.wiki.git';
apeDeploying.deployGhWiki('docs/wiki/*.md', wikiUrl, {
    clean: true
}, function (err) {
    /*...*/
});