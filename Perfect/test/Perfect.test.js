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
const Perfect = require('../Perfect');

const FIXTURES = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: true,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false,
  18: false,
  19: false,
  20: false,
  21: false,
  22: false,
  23: false,
  24: false,
  25: false,
  26: false,
  27: false,
  28: true,
  29: false,
};

describe('Perfect', () => {
  it('should raise TypeError when "number" is set to invalid type', () => {
    assert.throws(
      () => Perfect.isPerfect('invalid_type'),
      TypeError,
      'Perfect.isPerfect: expects parameter "number" to be of type integer: "string" given',
    );
  });

  it('should raise exception when given negative number', () => {
    assert.throws(
      () => Perfect.isPerfect(-1),
      Error,
      'Perfect.isPerfect expects parameter "number" to be greater than "-1": "-1" given',
    );
  });

  it('should return false for non-perfect number', () => {
    assert.strictEqual(Perfect.isPerfect(3), false);
  });

  it('should return true for perfect number', () => {
    assert.strictEqual(Perfect.isPerfect(6), true);
  });

  it('should return expected results for a sequence of numbers', () => {
    Object.entries(FIXTURES).forEach(([i, expected]) => {
      assert.strictEqual(Perfect.isPerfect(Number(i)), expected);
    });
  });
});
