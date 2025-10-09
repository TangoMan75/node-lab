/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Von Neumann's method, also called the middle-square method, generates pseudorandom numbers by squaring a seed value and
 * extracting the middle digits as the next number. This process repeats using the generated number as the new seed. While
 * simple, it has limitations like potential patterns and periodicity.
 */
class VonNeumann {
  pseudoRandom(seed) {
    if (!Number.isInteger(seed)) {
      throw new TypeError(`${this.constructor.name}.pseudoRandom: expects parameter "seed" to be of type integer: "${typeof seed}" given`);
    }

    if (seed < 1) {
      throw new Error(`${this.constructor.name}.pseudoRandom: expects parameter "number" to be a positive integer: "${seed}" given`);
    }

    const squared = (seed ** 2).toString();
    const middleDigits = squared.substring(Math.floor(squared.length / 2) - 2, Math.floor(squared.length / 2) + 2);

    return parseInt(middleDigits, 10);
  }
}

module.exports = new VonNeumann();
