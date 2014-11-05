'use strict';

var midsummary = require( './../lib' );

var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	data[i] = Math.round( Math.random()*100 );
}
console.log( midsummary( data, 0.35 ) );
