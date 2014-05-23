var express = require('express');
var KrakenApi = require('kraken-api');
var Mongo = require('mongodb');

var router = express.Router();

var insertIntoDb = function( tickerData ) {
  Mongo.Db.connect(process.env.MONGOLAB_URI, function (error, db) {
    if (!error) {
      db.collection('ticker', function(err, collection) {
        collection.insert(tickerData.result.XLTCZEUR, {safe: true}, function(er,rs) {
        });
      });
    }
  });
}

router.get('/', function(request, response) {
  var krakenApi = new KrakenApi('api_key', 'api_secret');
  krakenApi.api('Ticker', {"pair": 'XLTCZEUR'}, function(error, data) {
      if (error) {
        console.log( 'Error retrieving ticker data: ' + error );
      }
      else {
        insertIntoDb( data );
        response.send(200);
      }
  });
});

module.exports = router;
