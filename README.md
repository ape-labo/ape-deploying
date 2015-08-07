ape-deploying
==========

[![Build Status][my_travis_badge_url]][my_travis_url]
[![Code Climate][my_codeclimate_badge_url]][my_codeclimate_url]
[![Code Coverage][my_codeclimate_coverage_badge_url]][my_codeclimate_url]
[![npm version][my_npm_budge_url]][my_npm_url]

Deploying module of ape framework.


Usage
----

### Deploy to github pages.

```javascript
/**
 * This is an example to deploy gh pages.
 */

"use strict";


var apeDeploying = require('ape-deploying');

apeDeploying('docs', {

}, function(err){
    /*...*/
});
```


Installation
----

```javascript
$ npm install ape-deploying --save
```


License
-------
This software is released under the [MIT License][my_license_url].


Links
------

+ [GitHub Pages](https://pages.github.com/)


[npm_url]: https://www.npmjs.org/
[my_repo_url]: https://github.com/ape-repo/ape-deploying
[my_travis_url]: http://travis-ci.org/ape-repo/ape-deploying
[my_travis_badge_url]: http://img.shields.io/travis/ape-repo/ape-deploying.svg?style=flat
[my_license_url]: https://github.com/ape-repo/ape-deploying/blob/master/LICENSE
[my_codeclimate_url]: http://codeclimate.com/github/ape-repo/ape-deploying
[my_codeclimate_badge_url]: http://img.shields.io/codeclimate/github/ape-repo/ape-deploying.svg?style=flat
[my_codeclimate_coverage_badge_url]: http://img.shields.io/codeclimate/coverage/github/ape-repo/ape-deploying.svg?style=flat
[my_coverage_url]: http://ape-repo.github.io/ape-deploying/coverage/lcov-report
[my_npm_url]: http://www.npmjs.org/package/ape-deploying
[my_npm_budge_url]: http://img.shields.io/npm/v/ape-deploying.svg?style=flat

