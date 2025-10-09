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
const Factorial = require('../Factorial');

const FIXTURES = [
  1,
  2,
  6,
  24,
  120,
  720,
  5040,
  40320,
  362880,
  3628800,
];

describe('Factorial', () => {
  describe('#factorial()', () => {
    it('should raise TypeError when "number" is set to invalid type', () => {
      assert.throws(
        () => Factorial.factorial('invalid_type'),
        TypeError,
        'Factorial.factorial: expects parameter "number" to be of type integer: "string" given',
      );
    });

    it('should raise exception when "number" is set to negative value', () => {
      assert.throws(
        () => Factorial.factorial(-1),
        Error,
        'Factorial.factorial expects parameter "number" to be greater than "-1": "-1" given',
      );
    });

    it('should return expected sequence', () => {
      for (let i = 0; i < 10; i++) {
        assert.strictEqual(Factorial.factorial(i + 1), FIXTURES[i]);
      }
    });
  });

  describe('#factorialIterative()', () => {
    it('should raise TypeError when "number" is set to invalid type', () => {
      assert.throws(
        () => Factorial.factorialIterative('invalid_type'),
        TypeError,
        'Factorial.factorial: expects parameter "number" to be of type integer: "string" given',
      );
    });

    it('should raise exception when "number" is set to negative value', () => {
      assert.throws(
        () => Factorial.factorialIterative(-1),
        Error,
        'Factorial.factorial expects parameter "number" to be greater than "-1": "-1" given',
      );
    });

    it('should return expected sequence', () => {
      for (let i = 0; i < 10; i++) {
        assert.strictEqual(Factorial.factorialIterative(i + 1), FIXTURES[i]);
      }
    });
  });
});
