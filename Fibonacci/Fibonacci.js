/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Fibonacci
 *
 * The Fibonacci sequence is a mathematical pattern where each number is the sum of the previous two numbers.
 *
 *     Fn+1 = Fn + Fn-1
 *     fib(1) == 1
 *     fib(2) == 1
 *     fib(3) == 1+1 == 2
 *     fib(4) == 2+1 == 3
 *     fib(5) == 3+2 == 5
 *     fib(6) == 5+3 == 8
 *     n < 1 == Exception
 */
class Fibonacci {
  fibonacci(number) {
    if (!Number.isInteger(number)) {
      throw new TypeError(`${this.constructor.name}.fibonacci: expects parameter "number" to be of type integer: "${typeof number}" given`);
    }

    if (number < 1) {
      throw new Error(`${this.constructor.name}.fibonacci expects parameter "number" to be a positive integer: "${number}" given`);
    }

    if (number <= 2) {
      return 1;
    }

    return this.fibonacci(number - 1) + this.fibonacci(number - 2);
  }
}

module.exports = new Fibonacci();
