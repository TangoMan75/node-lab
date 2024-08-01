/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Ackermann
 *
 * The Ackermann function is a classic example of a recursive function that grows very quickly in value, as does the size of its call tree.
 * This script was inspired by the following Computerfile video :
 * - [The Most Difficult Program to Compute? - Computerphile](https://www.youtube.com/watch?v=i7sm9dzFtEI)
 */
class Ackermann {
  ackermann(m, n) {
    if (!Number.isInteger(m)) {
      throw new TypeError(`${this.constructor.name}.ackermann: expects parameter "m" to be of type integer: "${typeof m}" given`);
    }

    if (m < 0) {
      throw new Error(`${this.constructor.name}.ackermann: expects parameter "m" to be greater than "-1": ${m} given`);
    }

    if (!Number.isInteger(n)) {
      throw new TypeError(`${this.constructor.name}.ackermann: expects parameter "n" to be of type integer: "${typeof n}" given`);
    }

    if (n < 0) {
      throw new Error(`${this.constructor.name}.ackermann: expects parameter "n" to be greater than "-1": ${n} given`);
    }

    if (m === 0) {
      return n + 1;
    }

    if (n === 0) {
      return this.ackermann(m - 1, 1);
    }

    return this.ackermann(m - 1, this.ackermann(m, n - 1));
  }
}

module.exports = new Ackermann();
