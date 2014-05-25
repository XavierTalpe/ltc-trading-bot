var express = require( "express" );
var logfmt = require( "logfmt" );

var queryTicker = require( './routes/tasks/query_ticker' );

var app = express();

app.use( logfmt.requestLogger() );

app.use( '/tasks/query-ticker', queryTicker );

app.get( '/', function ( req, res ) {
  res.send( 'Root!' );
} );

var port = Number( process.env.PORT || 5000 );
app.listen( port, function () {
} );
