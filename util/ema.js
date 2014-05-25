function ema( elements, window_size ) {
  var k = 2.0 / (window_size + 1.0);

  var ema = elements[ 0 ];
  var result = [ ema ];
  for ( var i = 1; i < elements.length; i++ ) {
    ema = elements[ i ] * k + ema * ( 1.0 - k );
    result.append( ema )
  }

  return result;
}

module.exports = ema;
