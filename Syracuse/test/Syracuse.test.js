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
const Syracuse = require('../Syracuse');

const FIXTURES = [
  [1],
  [2, 1],
  [3, 10, 5, 16, 8, 4, 2, 1],
  [4, 2, 1],
  [5, 16, 8, 4, 2, 1],
  [6, 3, 10, 5, 16, 8, 4, 2, 1],
  [7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [8, 4, 2, 1],
  [9, 28, 14, 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [10, 5, 16, 8, 4, 2, 1],
  [11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [12, 6, 3, 10, 5, 16, 8, 4, 2, 1],
  [13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [14, 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [15, 46, 23, 70, 35, 106, 53, 160, 80, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [16, 8, 4, 2, 1],
  [17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [18, 9, 28, 14, 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [19, 58, 29, 88, 44, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [20, 10, 5, 16, 8, 4, 2, 1],
  [21, 64, 32, 16, 8, 4, 2, 1],
  [22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [23, 70, 35, 106, 53, 160, 80, 40, 20, 10, 5, 16, 8, 4, 2, 1],
  [24, 12, 6, 3, 10, 5, 16, 8, 4, 2, 1],
];

describe('Syracuse', () => {
  it('should raise TypeError when "number" is set to invalid type', () => {
    assert.throws(
      () => Syracuse.syracuse('invalid_type'),
      TypeError,
      'Syracuse.syracuse: expects parameter "number" to be of type integer: "string" given',
    );
  });

  it('should throw an exception for negative numbers', () => {
    assert.throws(
      () => Syracuse.syracuse(-1),
      Error,
      'Syracuse.syracuse: expects parameter "number" to be a positive integer: "-1" given',
    );
  });

  it('should throw an exception for zero', () => {
    assert.throws(
      () => Syracuse.syracuse(0),
      Error,
      'Syracuse.syracuse: expects parameter "number" to be a positive integer: "0" given',
    );
  });

  it('should generate Syracuse sequence for each input', () => {
    for (let i = 0; i < 24; i++) {
      assert.deepEqual(Syracuse.syracuse(i + 1), FIXTURES[i]);
    }
  });
});
