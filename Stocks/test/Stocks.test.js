/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { describe, it } = require('mocha');
const { assert } = require('chai');
const Stocks = require('../Stocks');

describe('Stocks', () => {
  const EXPECTED = ['NFLX', 'META', 'GOOGL'];
  const STOCKS_LIST = ['AMZN', 'GOOGL', 'META', 'NFLX'];
  const PRICES_LIST = [
    [10, 11, 12, 13, 14],
    [20, 21, 22, 23, 24],
    [30, 31, 32, 33, 34],
    [40, 41, 42, 43, 44],
  ];

  it('should raise TypeError when stocks is set to invalid type', () => {
    assert.throws(
      () => Stocks.getTopThree('invalid_type', []),
      TypeError,
      'Stocks.getTopThree: expects parameter "stocks" to be of type Array: "string" given',
    );
  });

  it('should raise TypeError when prices is set to invalid type', () => {
    assert.throws(
      () => Stocks.getTopThree([], 'invalid_type'),
      TypeError,
      'Stocks.getTopThree: expects parameter "prices" to be of type Array: "string" given',
    );
  });

  it('should raise exception for different list length size', () => {
    assert.throws(
      () => Stocks.getTopThree(['foo', 'bar'], [[1]]),
      Error,
      'Stocks.getTopThree: expects both arrays to have the same length',
    );
  });

  it('should raise exception for undersized lists', () => {
    assert.throws(
      () => Stocks.getTopThree(['foo', 'bar'], [[1], [2]]),
      Error,
      'Stocks.getTopThree: expects arrays to contain at least three items',
    );
  });

  it('should return top three stocks', () => {
    assert.deepEqual(Stocks.getTopThree(STOCKS_LIST, PRICES_LIST), EXPECTED);
  });
});
