/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * MinTemperature
 */
class MinTemperature {
  getClosestToZero(temperatures) {
    if (!Array.isArray(temperatures)) {
      throw new TypeError(`${this.constructor.name}.getClosestToZero: expects parameter "temperatures" to be of type Array: "${typeof temperatures}" given`);
    }

    if (temperatures.length === 0) {
      throw new Error(`${this.constructor.name}.getClosestToZero expects parameter "temperatures" to contain at least one value`);
    }

    if (temperatures.some((value) => !Number.isInteger(value))) {
      throw new Error(`${this.constructor.name}.getClosestToZero expects parameter "temperatures" to contain integers only`);
    }

    if (temperatures.length === 1) {
      return temperatures[0];
    }

    // initialize closest integer with the first value from temperatures array
    let closest = temperatures[0];

    temperatures.forEach((temperature) => {
      if (Math.abs(temperature) < Math.abs(closest)) {
        closest = temperature;

      // when two absolute values are equals, keep positive temperature if any
      } else if (Math.abs(temperature) === Math.abs(closest) && closest < 0) {
        closest = temperature;
      }
    });

    return closest;
  }

  getMinimumPositiveTemperature(temperatures) {
    if (!Array.isArray(temperatures)) {
      throw new TypeError(`${this.constructor.name}.getMinimumPositiveTemperature: expects parameter "temperatures" to be of type Array: "${typeof temperatures}" given`);
    }

    if (temperatures.length === 0) {
      throw new Error(`${this.constructor.name}.getMinimumPositiveTemperature expects parameter "temperatures" to contain at least one value`);
    }

    if (temperatures.some((value) => !Number.isInteger(value))) {
      throw new Error(`${this.constructor.name}.getMinimumPositiveTemperature expects parameter "temperatures" to contain integers only`);
    }

    const result = temperatures.filter((value) => value > 0);

    if (result.length === 0) {
      throw new Error(`${this.constructor.name}.getMinimumPositiveTemperature expects parameter "temperatures" to contain at least one positive value`);
    }

    return Math.min(...result);
  }
}

module.exports = new MinTemperature();
