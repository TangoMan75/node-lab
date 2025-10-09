/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * A perfect number is a positive integer that is equal to the sum of its proper divisors,
 * which are the positive integers that divide the number without leaving a remainder
 * and are less than the number itself.
 */
class Perfect {
  /**
   * Check if a number is perfect
   *
   * @param {number} number - The number to check
   * @returns {boolean} True if the number is perfect, false otherwise
   */
  isPerfect(number) {
    if (!Number.isInteger(number)) {
      throw new TypeError(`${this.constructor.name}.isPerfect: expects parameter "number" to be of type integer: "${typeof number}" given`);
    }

    if (number < 0) {
      throw new Error(`${this.constructor.name}.isPerfect expects parameter "number" to be greater than "-1": "${number}" given`);
    }

    // Find the sum of the proper divisors of number
    let divisorSum = 0;
    for (let i = 1; i < number; ++i) {
      if (number % i === 0) {
        divisorSum += i;
      }
    }

    // Check if the sum of the proper divisors is equal to number
    return divisorSum === number;
  }
}

module.exports = new Perfect();
