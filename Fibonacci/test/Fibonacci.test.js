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
const Fibonacci = require('../Fibonacci');

const FIXTURES = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

describe('Fibonacci', () => {
  it('should raise TypeError when "number" is set to invalid type', () => {
    assert.throws(
      () => Fibonacci.fibonacci('invalid_type'),
      TypeError,
      'Fibonacci.fibonacci: expects parameter "number" to be of type integer: "string" given',
    );
  });

  it('Negative number should raise an exception', () => {
    assert.throws(
      () => Fibonacci.fibonacci(-1),
      Error,
      'Fibonacci.fibonacci expects parameter "number" to be a positive integer: "-1" given',
    );
  });

  it('Zero should raise an exception', () => {
    assert.throws(
      () => Fibonacci.fibonacci(0),
      Error,
      'Fibonacci.fibonacci expects parameter "number" to be a positive integer: "0" given',
    );
  });

  it('Fibonacci method should return the expected sequence', () => {
    for (let i = 0; i < 10; i++) {
      assert.strictEqual(Fibonacci.fibonacci(i + 1), FIXTURES[i]);
    }
  });
});
