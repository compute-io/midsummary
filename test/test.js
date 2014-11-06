'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	midsummary = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-midsummary', function tests() {

	it( 'should export a function', function test() {
		expect( midsummary ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				midsummary( value, 0.10, {} );
			};
		}
	});

	it( 'should throw an error if provided a non-numeric value for the second argument', function test() {
		var values = [
			'5',
			true,
			[],
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				midsummary( [], value, {} );
			};
		}
	});

	it( 'should throw an error if provided an inappropriate value for the second argument', function test() {
		var values = [
			-0.10,
			0.53,
			12
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				midsummary( [], value, {} );
			};
		}
	});

	it( 'should throw an error if provided options that are not an object', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			function(){},
			true
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				midsummary( [], 0.10, value );
			};
		}
	});

	it( 'should compute the midsummary', function test() {
		var data, expected;

		// quartile indices are integers
		data = [ 6, 4, 3, 3, 5, 7, 4, 7 ];
		expected = 5;

		// unsorted test
		assert.strictEqual( midsummary( data, 0.25 ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// sorted test
		assert.strictEqual( midsummary( data, 0.25, {'sorted': true} ), expected );

		// quartile indices are not integers
		data = [ 9, 6, 4, 3, 3, 2, 5, 7, 4, 7 ];
		expected = 5;

		assert.strictEqual( midsummary( data, 0.25 ), expected );
	});

	it( 'should compute the midrange when n = 0.0', function test() {
		var data, expected;

		data = [ 9, 4, 3, 7, 1, 3 ];
		expected = 5;

		// unsorted test
		assert.strictEqual( midsummary( data, 0.0 ), expected );

	});

});
