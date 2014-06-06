var express = require( "express" );
var logfmt = require( "logfmt" );

var ticker = require( './routes/ticker' );

var app = express();

//app.engine( '.html', require( 'jade' ) );
app.use( logfmt.requestLogger() );

app.use( '/ticker', ticker );
app.use( express.static( __dirname + '/public' ) );

var port = Number( process.env.PORT || 5000 );
app.listen( port, function () {
} );
