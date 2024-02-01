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
const FizzBuzz = require('../FizzBuzz');

const FIXTURES = [1, 2, 4, 7, 8, 11, 13, 14];

describe('FizzBuzz', () => {
  describe('#fizzBuzz()', () => {
    it('should raise TypeError when "number" is set to invalid type', () => {
      assert.throws(
        () => FizzBuzz.fizzBuzz('invalid_type'),
        TypeError,
        'FizzBuzz.fizzBuzz: expects parameter "number" to be of type integer: "string" given',
      );
    });

    it('should raise exception for negative number', () => {
      assert.throw(
        () => FizzBuzz.fizzBuzz(-1),
        Error,
        'FizzBuzz.fizzBuzz expects parameter "number" to be a positive integer: "-1" given',
      );
    });

    it('should raise exception for zero', () => {
      assert.throw(
        () => FizzBuzz.fizzBuzz(0),
        Error,
        'FizzBuzz.fizzBuzz expects parameter "number" to be a positive integer: "0" given',
      );
    });

    it('should return "Fizz" for number 3', () => {
      assert.strictEqual(FizzBuzz.fizzBuzz(3), 'Fizz');
    });

    it('should return "Buzz" for number 5', () => {
      assert.strictEqual(FizzBuzz.fizzBuzz(5), 'Buzz');
    });

    it('should return "FizzBuzz" for number 15', () => {
      assert.strictEqual(FizzBuzz.fizzBuzz(15), 'FizzBuzz');
    });

    it('should return the same given number in sequence', () => {
      FIXTURES.forEach((number) => {
        assert.strictEqual(FizzBuzz.fizzBuzz(number), number.toString());
      });
    });
  });

  describe('#fizzBuzzAlt()', () => {
    it('should raise TypeError when "number" is set to invalid type', () => {
      assert.throws(
        () => FizzBuzz.fizzBuzzAlt('invalid_type'),
        TypeError,
        'FizzBuzz.fizzBuzzAlt: expects parameter "number" to be of type integer: "string" given',
      );
    });

    it('should raise exception for negative number', () => {
      assert.throw(
        () => FizzBuzz.fizzBuzzAlt(-1),
        Error,
        'FizzBuzz.fizzBuzzAlt expects parameter "number" to be a positive integer: "-1" given',
      );
    });

    it('should raise exception for zero', () => {
      assert.throw(
        () => FizzBuzz.fizzBuzzAlt(0),
        Error,
        'FizzBuzz.fizzBuzzAlt expects parameter "number" to be a positive integer: "0" given',
      );
    });

    it('should return "Fizz" for number 3', () => {
      assert.strictEqual(FizzBuzz.fizzBuzzAlt(3), 'Fizz');
    });

    it('should return "Buzz" for number 5', () => {
      assert.strictEqual(FizzBuzz.fizzBuzzAlt(5), 'Buzz');
    });

    it('should return "FizzBuzz" for number 15', () => {
      assert.strictEqual(FizzBuzz.fizzBuzzAlt(15), 'FizzBuzz');
    });

    it('should return the same given number in sequence', () => {
      FIXTURES.forEach((number) => {
        assert.strictEqual(FizzBuzz.fizzBuzzAlt(number), number.toString());
      });
    });
  });
});
