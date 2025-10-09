/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The Syracuse Conjecture, also known as the Collatz Conjecture, proposes that for any positive integer,
 * if it is even, divide it by two, and if it is odd, multiply it by three and add one, and repeat this process.
 * The conjecture suggests that no matter what number you start with, this sequence will eventually reach 1
 * and then continue cycling between 1 and 4. It's an unsolved problem in mathematics.
 */
class Syracuse {
  syracuse(number) {
    if (!Number.isInteger(number)) {
      throw new TypeError(`${this.constructor.name}.syracuse: expects parameter "number" to be of type integer: "${typeof number}" given`);
    }

    if (number < 1) {
      throw new Error(`${this.constructor.name}.syracuse: expects parameter "number" to be a positive integer: "${number}" given`);
    }

    switch (true) {
      case number === 1:
        return [number];
      case number % 2 === 0:
        return [number, ...this.syracuse(number / 2)];
      default:
        return [number, ...this.syracuse(number * 3 + 1)];
    }
  }
}

module.exports = new Syracuse();
