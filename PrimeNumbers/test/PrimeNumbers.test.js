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
const PrimeNumbers = require('../PrimeNumbers');

const FIXTURES = {
  1: false,
  2: true,
  3: true,
  4: false,
  5: true,
  6: false,
  7: true,
  8: false,
  9: false,
  10: false,
  11: true,
  12: false,
  13: true,
  14: false,
  15: false,
  16: false,
  17: true,
  18: false,
  19: true,
  20: false,
  21: false,
  22: false,
  23: true,
  24: false,
  25: false,
  26: false,
  27: false,
  28: false,
  29: true,
};

describe('PrimeNumbers', () => {
  it('should raise TypeError when "number" is set to invalid type', () => {
    assert.throws(
      () => PrimeNumbers.isPrime('invalid_type'),
      TypeError,
      'PrimeNumbers.isPrime: expects parameter "number" to be of type integer: "string" given',
    );
  });

  it('should raise an exception when the number is negative', () => {
    assert.throws(
      () => PrimeNumbers.isPrime(-1),
      Error,
      'PrimeNumbers.isPrime expects parameter "number" to be a positive integer: "-1" given',
    );
  });

  it('should raise an exception when the number is zero', () => {
    assert.throws(
      () => PrimeNumbers.isPrime(0),
      Error,
      'PrimeNumbers.isPrime expects parameter "number" to be a positive integer: "0" given',
    );
  });

  it('should return the expected sequence', () => {
    Object.entries(FIXTURES).forEach(([i, expected]) => {
      assert.strictEqual(PrimeNumbers.isPrime(Number(i)), expected);
    });
  });
});
