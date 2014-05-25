#!/usr/bin/env node

var KrakenApi = require( 'kraken-api' );
var Mongo = require( 'mongodb' );

var krakenApi = new KrakenApi( 'api_key', 'api_secret' );

krakenApi.api( 'Ticker', {'pair': 'XLTCZEUR'}, function ( error, data ) {
  if ( error ) {
    console.log( 'Error retrieving ticker data: ' + error );
  }
  else {
    var tick = parseData( data );
    saveData( tick );
  }
} );

function parseData( data ) {
  var query_results = data.result;

  var tick_ltc_eur = query_results[ 'XLTCZEUR' ];

  var tick = {};
  tick.lowest_ask = parseFloat( tick_ltc_eur[ 'a' ][ 0 ] );
  tick.highest_bid = parseFloat( tick_ltc_eur[ 'b' ][ 0 ] );
  tick.last_trade = parseFloat( tick_ltc_eur[ 'c' ][ 0 ] );
  tick.volume_traded = parseFloat( tick_ltc_eur[ 'v' ][ 1 ] );
  tick.avg_price = parseFloat( tick_ltc_eur[ 'p' ][ 1 ] );
  tick.number_trades = parseFloat( tick_ltc_eur[ 't' ][ 1 ] );
  tick.ha_low = parseFloat( tick_ltc_eur[ 'l' ][ 1 ] );
  tick.ha_high = parseFloat( tick_ltc_eur[ 'h' ][ 1 ] );
  tick.opening_price = parseFloat( tick_ltc_eur[ 'o' ] );
  tick.datetime = new Date();

  return tick;
}

function saveData( tick ) {
  Mongo.Db.connect( process.env.MONGOLAB_URI, function ( error, db ) {
    if ( error ) {
      console.log( 'Error connecting to database ' + error );
    }
    else {
      db.collection( 'ticker', function ( error, collection ) {
        collection.insert( tick, {safe: true}, function ( er, rs ) {
          if ( er ) {
            console.log( 'Error connecting to database ' + error );
          }
        } );
      } );
    }
  } );
}
