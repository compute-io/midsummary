/**
*
*	COMPUTE: midsummary
*
*
*	DESCRIPTION:
*		- Computes a trimmed midrange of a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	quantile = require( 'compute-quantile' );


// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function used to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()


// MIDSUMMARY //

/**
* FUNCTION: midsummary( arr, n[, opts] )
*	Computes the midsummary of a numeric array.
*
* @param {Array} arr - numeric array
* @param {Number} n - % value between 0 and 0.50 by which to trim the data set
* @param {Object} [opts] - quantile options
* @returns {Number} midsummary
*/
function midsummary( arr, n, opts ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'midsummary()::invalid input argument. Must provide an array.' );
	}
	if ( typeof n !== 'number' || n !== n ) {
		throw new TypeError( 'midsummary()::invalid input argument. Percentage must be numeric.' );
	}
	if ( n < 0.0 || n > 0.50 ) {
		throw new TypeError( 'midsummary()::invalid input argument. Must provide a percentage between 0 and 0.5 inclusive.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'midsummary()::invalid input argument. Options should be an object.' );
		}
	} else {
		opts = {
			'sorted': false
		};
	}
	if ( !opts.sorted ) {
		arr = arr.slice();
		arr.sort( ascending );
		opts.sorted = true;
	}
	var len = arr.length,
		el = 0;

	if ( n === 0 ) {
		// special case: midrange
		return ( arr[0] + arr[len-1] ) / 2.0;
	}
	else if ( n === 0.5 ) {
		// special case: median
		el = Math.floor( len / 2.0 );
 		if ( len % 2.0 ) {
 			// Middle index exists
 			return arr[ el ];
 		}
 		else {
 			return ( arr[ el ] + arr[ el-1 ] ) / 2.0;
 		}
	}	
	else {
		return ( quantile( arr, n, opts ) + quantile( arr, 1 - n, opts ) ) / 2.0;
	}
} // end FUNCTION midsummary()


// EXPORTS //

module.exports = midsummary;
