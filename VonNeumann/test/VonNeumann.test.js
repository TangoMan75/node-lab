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
const VonNeumann = require('../VonNeumann');

const FIXTURES = [
  1234,
  5227,
  3215,
  3362,
  3030,
  1809,
  2724,
  4201,
  6484,
  422,
  7808,
];

describe('VonNeumann', () => {
  it('should raise TypeError when "seed" is set to invalid type', () => {
    assert.throws(
      () => VonNeumann.pseudoRandom('invalid_type'),
      TypeError,
      'VonNeumann.pseudoRandom: expects parameter "seed" to be of type integer: "string" given',
    );
  });

  it('should raise exception for negative number', () => {
    assert.throws(
      () => VonNeumann.pseudoRandom(-1),
      Error,
      'VonNeumann.pseudoRandom: expects parameter "number" to be a positive integer: "-1" given',
    );
  });

  it('should raise exception for zero', () => {
    assert.throws(
      () => VonNeumann.pseudoRandom(0),
      Error,
      'VonNeumann.pseudoRandom: expects parameter "number" to be a positive integer: "0" given',
    );
  });

  it('should generate pseudo-random numbers', () => {
    for (let i = 0; i < 10; ++i) {
      assert.strictEqual(VonNeumann.pseudoRandom(FIXTURES[i]), FIXTURES[i + 1]);
    }
  });
});
