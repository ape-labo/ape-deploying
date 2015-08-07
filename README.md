ape-deploying
==========

[![Build Status][my_travis_badge_url]][my_travis_url]
[![Code Climate][my_codeclimate_badge_url]][my_codeclimate_url]
[![Code Coverage][my_codeclimate_coverage_badge_url]][my_codeclimate_url]
[![Dependency Status][my_gemnasium_badge_url]][my_gemnasium_url]
[![npm Version][my_npm_budge_url]][my_npm_url]


Deploying module of ape framework.

Installation
----

```bash
$ npm install ape-deploying --save-dev
```


Usage
----

### Deploy to GitHub Pages

Deploy subdirectory to GitHub Pages using git subtree.

```javascript
#!/usr/bin/env node

var apeDeploying = require('ape-deploying');

apeDeploying.deployGhPages('docs', {

}, function(err){
    /*...*/
});
```

### Deploy to GitHub Wiki

Deploy files to GitHub Wiki page.

```javascript
#!/usr/bin/env node

var apeDeploying = require('ape-deploying');

var wikiUrl = 'https://github.com/okunishinishi/node-coz.wiki.git';
apeDeploying.deployGhWiki('docs/wiki/*.md', wikiUrl, {
    clean: true
}, function (err) {
    /*...*/
});
```


License
-------
This software is released under the [MIT License][my_license_url].


Links
------

+ [ape-repo](https://github.com/ape-repo)
+ [GitHub Pages](https://pages.github.com/)


[npm_url]: https://www.npmjs.org/
[my_repo_url]: https://github.com/ape-repo/ape-deploying
[my_travis_url]: http://travis-ci.org/ape-repo/ape-deploying
[my_travis_badge_url]: http://img.shields.io/travis/ape-repo/ape-deploying.svg?style=flat
[my_license_url]: https://github.com/ape-repo/ape-deploying/blob/master/LICENSE
[my_codeclimate_url]: http://codeclimate.com/github/ape-repo/ape-deploying
[my_codeclimate_badge_url]: http://img.shields.io/codeclimate/github/ape-repo/ape-deploying.svg?style=flat
[my_codeclimate_coverage_badge_url]: http://img.shields.io/codeclimate/coverage/github/ape-repo/ape-deploying.svg?style=flat
[my_gemnasium_url]: https://gemnasium.com/ape-repo/ape-deploying
[my_gemnasium_badge_url]: https://gemnasium.com/ape-repo/ape-deploying.svg
[my_npm_url]: http://www.npmjs.org/package/ape-deploying
[my_npm_budge_url]: http://img.shields.io/npm/v/ape-deploying.svg?style=flat

