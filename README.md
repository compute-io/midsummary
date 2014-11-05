midsummary
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Compute module to find the [midsummary](http://en.wikipedia.org/wiki/Mid-range#midsummary) for an array of numeric values.

The __midsummary__, or __*n*% trimmed midrange__, is the average of the *n*% and (100-*n*)% percentiles, and has a breakdown point of *n*%. Trimmed midranges are of interest as descriptive statistics or as L-estimators of central location or skewness: differences of midsummaries, such as [midhinge](http://en.wikipedia.org/wiki/Midhinge) minus the [median](http://en.wikipedia.org/wiki/Median), give measures of skewness at different points in the tail.

#### Special Cases:
+ The 50% midsummary equates to the median (see [median](https://github.com/compute-io/median) compute module).
+ The 25% midsummary is the midhinge (see [compute-midhinge](https://github.com/compute-io/midhinge) compute module).


## Installation

``` bash
$ npm install compute-midsummary
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var midsummary = require( 'compute-midsummary' );
```

#### midsummary( arr, perc[, opts] )

Computes the *n*% midsummary of a numeric `array`, where *n* is given as the second argument, in decimal form, and satisfies 0.0 <= *n* <= 0.50.

``` javascript
var unsorted = [ 8, 2, 3, 9, 5, 1, 4, 10, 7, 0, 6 ];

var mids = midsummary( unsorted, 0.25 );
// returns 5
```

If the input `array` is already `sorted` in __ascending__ order, set the `sorted` options flag to `true`.

``` javascript
var sorted = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

var mids = midsummary( sorted, 0.25, {'sorted': true} );
// returns 5
```

Additional options are the same as for the [quantile](https://github.com/compute-io/quantile) module.

## Examples

``` javascript
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
    data[ i ] = Math.round( Math.random()*100 );
}

console.log( midsummary( data, 0.10 ) );
```
To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Rebekah Smith.


[npm-image]: http://img.shields.io/npm/v/compute-midsummary.svg
[npm-url]: https://npmjs.org/package/compute-midsummary

[travis-image]: http://img.shields.io/travis/compute-io/midsummary/master.svg
[travis-url]: https://travis-ci.org/compute-io/midsummary

[coveralls-image]: https://img.shields.io/coveralls/compute-io/midsummary/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/midsummary?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/midsummary.svg
[dependencies-url]: https://david-dm.org/compute-io/midsummary

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/midsummary.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/midsummary

[github-issues-image]: http://img.shields.io/github/issues/compute-io/midsummary.svg
[github-issues-url]: https://github.com/compute-io/midsummary/issues
