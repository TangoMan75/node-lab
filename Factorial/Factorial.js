/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Factorial
 *
 * In mathematics, the factorial of a non-negative integer is the product of all positive integers less than or equal to that integer.
 */
class Factorial {
  /**
   * Compute factorial recursively
   *
   * @param  {number} number - number to compute factorial
   * @return {number}        - factorial of number
   */
  factorial(number) {
    if (!Number.isInteger(number)) {
      throw new TypeError(`${this.constructor.name}.factorial: expects parameter "number" to be of type integer: "${typeof number}" given`);
    }

    if (number < 0) {
      throw new Error(`${this.constructor.name}.factorial expects parameter "number" to be greater than "-1": "${number}" given`);
    }

    if (number === 0) {
      return 1;
    }

    return number * this.factorial(number - 1);
  }

  /**
   * Compute factorial iteratively
   *
   * @param  {number} number - number to compute factorial
   * @return {number}        - factorial of number
   */
  factorialIterative(number) {
    if (!Number.isInteger(number)) {
      throw new TypeError(`${this.constructor.name}.factorial: expects parameter "number" to be of type integer: "${typeof number}" given`);
    }

    if (number < 0) {
      throw new Error(`${this.constructor.name}.factorial expects parameter "number" to be greater than "-1": "${number}" given`);
    }

    let result = 1;

    for (let i = 1; i <= number; i++) {
      result *= i;
    }

    return result;
  }
}

module.exports = new Factorial();
