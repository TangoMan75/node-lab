/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Tower of Hanoi
 *
 * The Tower of Hanoi is a mathematical puzzle where you have 3 rods
 * and N disks of different sizes which can slide onto any rod. The
 * puzzle starts with the disks stacked in ascending order of size on
 * one rod, the smallest disk at the top.
 *
 * The objective of the puzzle is to move the entire stack to the last
 * rod, obeying the following rules:
 *
 * 1. Only one disk may be moved at a time.
 * 2. Each move consists of taking the upper disk from one of the stacks
 *    and placing it on top of another stack or an empty rod.
 * 3. No disk may be placed on top of a smaller disk.
 *
 * This class implements the Tower of Hanoi puzzle and provides a method
 * to return the list of steps required to solve the puzzle for a given
 * number of disks.
 */
class TowerOfHanoi {
  /**
   * Returns the list of steps required to solve the puzzle for a given
   * number of disks.
   */
  towerOfHanoi(numDisks, startPole, endPole, sparePole) {
    if (!Number.isInteger(numDisks)) {
      throw new TypeError(`${this.constructor.name}.towerOfHanoi: expects parameter "numDisks" to be of type integer: "${typeof numDisks}" given`);
    }

    if (typeof startPole !== 'string') {
      throw new TypeError(`${this.constructor.name}.towerOfHanoi: expects parameter "startPole" to be of type string: "${typeof startPole}" given`);
    }

    if (typeof endPole !== 'string') {
      throw new TypeError(`${this.constructor.name}.towerOfHanoi: expects parameter "endPole" to be of type string: "${typeof endPole}" given`);
    }

    if (typeof sparePole !== 'string') {
      throw new TypeError(`${this.constructor.name}.towerOfHanoi: expects parameter "sparePole" to be of type string: "${typeof sparePole}" given`);
    }

    if (numDisks < 1) {
      throw new Error(`${this.constructor.name}.towerOfHanoi expects parameter "number" to be a positive integer: "${numDisks}" given`);
    }

    [startPole, endPole, sparePole].forEach((pole) => {
      if (!['A', 'B', 'C'].includes(pole)) {
        throw new Error(`${this.constructor.name}.towerOfHanoi expects pole parameters to contain "A", "B", or "C": "${pole}" given`);
      }
    });

    if (numDisks === 1) {
      return [[numDisks, startPole, endPole]];
    }

    return [
      ...this.towerOfHanoi(numDisks - 1, startPole, sparePole, endPole),
      [numDisks, startPole, endPole],
      ...this.towerOfHanoi(numDisks - 1, sparePole, endPole, startPole),
    ];
  }
}

module.exports = new TowerOfHanoi();
