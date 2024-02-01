/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * A palindrome is a word, phrase, or number that reads the same backward as it does forward.
 */
class Palindrome {
  /**
   * Check whether a given string is a palindrome or not.
   *
   * @param {string} string - The string to check.
   * @returns {boolean} True if the given string is a palindrome, false otherwise.
   */
  isPalindrome(string) {
    if (typeof string !== 'string') {
      throw new TypeError(`${this.constructor.name}.isPalindrome: expects parameter "string" to be of type string: "${typeof string}" given`);
    }

    // Remove any non-alphabetic characters and make the string lowercase.
    const cleanedString = string.replace(/[^a-zA-Z]/g, '').toLowerCase();

    if (cleanedString.length === 0) {
      throw new Error(`${this.constructor.name}.isPalindrome: expects parameter "string" to contain at least one character`);
    }

    // Check if the string is the same forwards and backwards.
    return cleanedString === cleanedString.split('').reverse().join('');
  }

  /**
   * Check whether a given string is a palindrome or not, using recursion.
   *
   * @param {string} string - The string to check.
   * @returns {boolean} True if the given string is a palindrome, false otherwise.
   */
  isPalindromeRecursive(string) {
    if (typeof string !== 'string') {
      throw new TypeError(`${this.constructor.name}.isPalindromeRecursive: expects parameter "string" to be of type string: "${typeof string}" given`);
    }

    // Remove any non-alphabetic characters and make the string lowercase.
    const cleanedString = string.replace(/[^a-zA-Z]/g, '').toLowerCase();

    if (cleanedString.length === 0) {
      throw new Error(`${this.constructor.name}.isPalindromeRecursive: expects parameter "string" to contain at least one character`);
    }

    if (cleanedString.length === 1) {
      return true;
    }

    if (cleanedString[0] === cleanedString[cleanedString.length - 1]) {
      if (cleanedString.length === 2) {
        return true;
      }

      return this.isPalindromeRecursive(cleanedString.substring(1, cleanedString.length - 1));
    }

    return false;
  }
}

module.exports = new Palindrome();
