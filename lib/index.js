/**
*
*	COMPUTE: midsummary
*
*
*	DESCRIPTION:
*		- Compute module to find the midsummary (n% trimmed midrange) for an array of numeric values.
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
* Comparator function used to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()

/**
* FUNCTION: midsummary( arr, perc[, opts] )
* Computes the midsummary of a numeric array.
*
* @param {Array} arr - numeric array
* @param {Number} perc - % value between 0 and 0.50 by which to trim the data set
* @param {Object} [opts] - quantile options
* @returns {Number} midsummary
*/
function midsummary( arr, perc, opts ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'midsummary()::invalid input argument. Must provide an array.' );
	}

	if ( typeof perc !== 'number' || perc !== perc ) {
		throw new TypeError( 'midsummary()::invalid input argument. Window must be numeric.' );
	}

	if ( perc < 0.0 || perc > 0.50 ) {
		throw new TypeError( 'midsummary()::invalid input argument. Must provide trim % between 0 and 0.5.' );
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

	return ( quantile( arr, perc, opts ) + quantile( arr, (1-perc), opts ) ) / 2.0;
} // end FUNCTION midsummary()

// EXPORTS //
module.exports = midsummary;
