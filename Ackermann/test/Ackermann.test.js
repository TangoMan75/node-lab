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
const Ackermann = require('../Ackermann');

const FIXTURES = [
  [1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7],
  [3, 5, 7, 9, 11, 13],
  [5, 13, 29, 61, 125, 253],
];

describe('Ackermann', () => {
  it('m should raise TypeError when set to invalid type', () => {
    assert.throws(
      () => Ackermann.ackermann('invalid_type', 0),
      TypeError,
      'Ackermann.ackermann: expects parameter "m" to be of type integer: "string" given',
    );
  });

  it('n should raise TypeError when set to invalid type', () => {
    assert.throws(
      () => Ackermann.ackermann(0, 'invalid_type'),
      TypeError,
      'Ackermann.ackermann: expects parameter "n" to be of type integer: "string" given',
    );
  });

  it('m should raise ValueError when set to negative value', () => {
    assert.throws(
      () => Ackermann.ackermann(-1, 3),
      Error,
      'Ackermann.ackermann: expects parameter "m" to be greater than "-1": -1 given',
    );
  });

  it('n should raise ValueError when set to negative value', () => {
    assert.throws(
      () => Ackermann.ackermann(3, -1),
      Error,
      'Ackermann.ackermann: expects parameter "n" to be greater than "-1": -1 given',
    );
  });

  it('should return the expected sequence for Ackermann', () => {
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 6; ++j) {
        assert.strictEqual(Ackermann.ackermann(i, j), FIXTURES[i][j]);
      }
    }
  });
});
