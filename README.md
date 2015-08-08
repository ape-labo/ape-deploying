ape-deploying
==========

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![Dependency Status][bd_gemnasium_shield_url]][bd_gemnasium_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/ape-repo/ape-deploying
[bd_travis_url]: http://travis-ci.org/ape-repo/ape-deploying
[bd_travis_shield_url]: http://img.shields.io/travis/ape-repo/ape-deploying.svg?style=flat
[bd_license_url]: https://github.com/ape-repo/ape-deploying/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/ape-repo/ape-deploying
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/ape-repo/ape-deploying.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/ape-repo/ape-deploying.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/ape-repo/ape-deploying
[bd_gemnasium_shield_url]: https://gemnasium.com/ape-repo/ape-deploying.svg
[bd_npm_url]: http://www.npmjs.org/package/ape-deploying
[bd_npm_shield_url]: http://img.shields.io/npm/v/ape-deploying.svg?style=flat

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Deploying module of ape framework.

<!-- Description End -->



<!-- Sections Start -->
<a name="sections"></a>

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

<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/ape-repo/ape-deploying/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [ape-repo](https://github.com/ape-repo)
+ [GitHub Pages](https://pages.github.com/)

<!-- Links End -->
