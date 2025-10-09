/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Generate Multisoft URL
 */
class Multisoft {
  /**
   * @param  {string} a - string to process
   * @return {string}   - result url
   */
  multisoft(a) {
    if (typeof a !== 'string') {
      throw new TypeError(`${this.constructor.name}.multisoft: expects parameter "a" to be of type string: "${typeof a}" given`);
    }

    if (a.length < 2) {
      throw new Error(`${this.constructor.name}.multisoft: expects parameter "a" to contain at least two characters`);
    }

    let s = '';

    for (let i = 1; i < a.length; i++) {
      if (a[i] % 2 === a[i - 1] % 2) {
        s += Math.max(a[i], a[i - 1]);
      }
    }

    return `https://www.multisoft.se/${s}`;
  }
}

module.exports = new Multisoft();
