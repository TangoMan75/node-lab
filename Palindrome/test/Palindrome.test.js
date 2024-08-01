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
const Palindrome = require('../Palindrome');

describe('Palindrome', () => {
  describe('#isPalindrome()', () => {
    it('string should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => Palindrome.isPalindrome(123),
        TypeError,
        'Palindrome.isPalindrome: expects parameter "string" to be of type string: "number" given',
      );
    });

    it('should raise an exception for isPalindrome with an empty string', () => {
      assert.throws(
        () => Palindrome.isPalindrome(''),
        Error,
        'Palindrome.isPalindrome: expects parameter "string" to contain at least one character',
      );
    });

    it('should return true for isPalindrome', () => {
      assert.strictEqual(Palindrome.isPalindrome('noon'), true);
      assert.strictEqual(Palindrome.isPalindrome('racecar'), true);
      assert.strictEqual(Palindrome.isPalindrome('A man, a plan, a canal, Panama!'), true);
    });

    it('should return false for isPalindrome', () => {
      assert.strictEqual(Palindrome.isPalindrome('This is not a palindrome'), false);
    });
  });

  describe('#isPalindromeRecursive()', () => {
    it('string should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => Palindrome.isPalindromeRecursive(123),
        TypeError,
        'Palindrome.isPalindromeRecursive: expects parameter "string" to be of type string: "number" given',
      );
    });

    it('should raise an exception for isPalindromeRecursive with an empty string', () => {
      assert.throws(
        () => Palindrome.isPalindromeRecursive(''),
        Error,
        'Palindrome.isPalindromeRecursive: expects parameter "string" to contain at least one character',
      );
    });

    it('should return true for isPalindromeRecursive', () => {
      assert.strictEqual(Palindrome.isPalindromeRecursive('noon'), true);
      assert.strictEqual(Palindrome.isPalindromeRecursive('racecar'), true);
      assert.strictEqual(Palindrome.isPalindromeRecursive('A man, a plan, a canal, Panama!'), true);
    });

    it('should return false for isPalindromeRecursive', () => {
      assert.strictEqual(Palindrome.isPalindromeRecursive('This is not a palindrome'), false);
    });
  });
});
