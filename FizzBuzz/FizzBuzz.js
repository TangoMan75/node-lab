/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * FizzBuzz
 *
 * This script is inspired by the following Tom Scott video :
 * "FizzBuzz: One Simple Interview Question"
 * https://www.youtube.com/watch?v=QPZ0pIK_wsc
 */
class FizzBuzz {
  fizzBuzz(number) {
    if (!Number.isInteger(number)) {
      throw new TypeError(`${this.constructor.name}.fizzBuzz: expects parameter "number" to be of type integer: "${typeof number}" given`);
    }

    if (number < 1) {
      throw new Error(`${this.constructor.name}.fizzBuzz expects parameter "number" to be a positive integer: "${number}" given`);
    }

    let string = '';

    if (number % 3 === 0) {
      string = 'Fizz';
    }

    if (number % 5 === 0) {
      string += 'Buzz';
    }

    if (string === '') {
      return number.toString();
    }

    return string;
  }

  fizzBuzzAlt(number) {
    if (!Number.isInteger(number)) {
      throw new TypeError(`${this.constructor.name}.fizzBuzzAlt: expects parameter "number" to be of type integer: "${typeof number}" given`);
    }

    if (number < 1) {
      throw new Error(`${this.constructor.name}.fizzBuzzAlt expects parameter "number" to be a positive integer: "${number}" given`);
    }

    if (number % 15 === 0) {
      return 'FizzBuzz';
    }

    if (number % 3 === 0) {
      return 'Fizz';
    }

    if (number % 5 === 0) {
      return 'Buzz';
    }

    return number.toString();
  }
}

module.exports = new FizzBuzz();
