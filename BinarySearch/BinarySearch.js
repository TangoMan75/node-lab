/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * BinarySearch
 *
 * A binary search algorithm is a search technique that finds the position of a target value within a sorted array.
 * It works by repeatedly dividing the search interval in half until the target is found.
 */
class BinarySearch {
  binarySearch(array, thingToFind, start = 0, end = null) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${this.constructor.name}.binarySearch: expects parameter "array" to be of type Array: "${typeof array}" given`);
    }

    if (array.length === 0) {
      return false;
    }

    if (thingToFind === null || thingToFind === undefined) {
      throw new Error(`${this.constructor.name}.binarySearch: argument "thingToFind" cannot be empty`);
    }

    if (typeof start !== 'number' || Number.isNaN(start) || !Number.isInteger(start)) {
      throw new TypeError(`${this.constructor.name}.binarySearch: expects parameter "start" to be of type number: "${typeof start}" given`);
    }

    if (start < 0) {
      throw new Error(`${this.constructor.name}.binarySearch: expects parameter "start" to be greater than or equal to 0: "${start}" given`);
    }

    // Set default value for "end"
    if (end === null) {
      end = array.length - 1;
    }

    if (typeof end !== 'number' || Number.isNaN(end) || !Number.isInteger(end)) {
      throw new TypeError(`${this.constructor.name}.binarySearch: expects parameter "end" to be of type number: "${typeof end}" given`);
    }

    if (start > end) {
      return false;
    }

    const mid = Math.floor((start + end) / 2);

    if (array[mid] === thingToFind) {
      return true;
    }

    if (thingToFind < array[mid]) {
      return this.binarySearch(array, thingToFind, start, mid - 1);
    }

    if (thingToFind > array[mid]) {
      return this.binarySearch(array, thingToFind, mid + 1, end);
    }

    return false;
  }
}

module.exports = new BinarySearch();
