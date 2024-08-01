/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * PrimeNumbers
 *
 * A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. Examples include 2, 3, 5, and 7.
 */
class PrimeNumbers {
  /**
   * @param {number} number - The number to check for primality.
   * @returns {boolean} - True if the number is prime, false otherwise.
   */
  isPrime(number) {
    if (!Number.isInteger(number)) {
      throw new TypeError(`${this.constructor.name}.isPrime: expects parameter "number" to be of type integer: "${typeof number}" given`);
    }

    if (number < 1) {
      throw new Error(`${this.constructor.name}.isPrime expects parameter "number" to be a positive integer: "${number}" given`);
    }

    for (let i = 2; i <= Math.sqrt(number); ++i) {
      if (number % i === 0) {
        return false;
      }
    }

    return number > 1;
  }
}

module.exports = new PrimeNumbers();
