var Express = require( 'express' );
var Mongo = require( 'mongodb' );
var Async = require( 'async' );

var Router = Express.Router();

Router.get( '/', function ( request, response ) {
  Async.waterfall( [
                     function ( callback ) {
                       Mongo.Db.connect( process.env.MONGOLAB_URI, callback );
                     }                                                       ,
                     function ( database, callback ) {
                       database.collection( 'ticker', callback );
                     }       ,
                     function ( collection, callback ) {
                       var minDate = new Date();
                       minDate.setDate( minDate.getDate() - 1 );

                       var query = {'datetime': {$gt: minDate.getTime()}};
                       var options = {sort: [
                         ['datetime', 'ascending']
                       ]};

                       collection.find( query, options ).toArray( callback );
                     },
                     function ( results, callback ) {
                       callback( null, results );
                     }
                   ],
                   function ( error, results ) {
                     if ( error ) {
                       response.send( error );
                       response.status( 400 );
                     }
                     else {
                       response.send( JSON.stringify( results ) );
                       response.status( 200 );
                     }
                   } );
} );

module.exports = Router;
