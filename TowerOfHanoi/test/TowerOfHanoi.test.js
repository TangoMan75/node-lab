/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { describe, it } = require('mocha');
const { assert } = require('chai');
const TowerOfHanoi = require('../TowerOfHanoi');

const FIXTURES = [
  [1, 'A', 'C', 'B'],
  [
    [1, 'A', 'C'],
  ],
  [2, 'A', 'C', 'B'],
  [
    [1, 'A', 'B'],
    [2, 'A', 'C'],
    [1, 'B', 'C'],
  ],
  [3, 'A', 'C', 'B'],
  [
    [1, 'A', 'C'],
    [2, 'A', 'B'],
    [1, 'C', 'B'],
    [3, 'A', 'C'],
    [1, 'B', 'A'],
    [2, 'B', 'C'],
    [1, 'A', 'C'],
  ],
  [4, 'A', 'C', 'B'],
  [
    [1, 'A', 'B'],
    [2, 'A', 'C'],
    [1, 'B', 'C'],
    [3, 'A', 'B'],
    [1, 'C', 'A'],
    [2, 'C', 'B'],
    [1, 'A', 'B'],
    [4, 'A', 'C'],
    [1, 'B', 'C'],
    [2, 'B', 'A'],
    [1, 'C', 'A'],
    [3, 'B', 'C'],
    [1, 'A', 'B'],
    [2, 'A', 'C'],
    [1, 'B', 'C'],
  ],
];

describe('TowerOfHanoi', () => {
  it('should raise TypeError when "numDisks" is set to invalid type', () => {
    assert.throws(
      () => TowerOfHanoi.towerOfHanoi('invalid_type', 'A', 'B', 'C'),
      TypeError,
      'TowerOfHanoi.towerOfHanoi: expects parameter "numDisks" to be of type integer: "string" given',
    );
  });

  it('startPole should raise TypeError when set to invalid type', () => {
    assert.throws(
      () => TowerOfHanoi.towerOfHanoi(3, 123, 'B', 'C'),
      TypeError,
      'TowerOfHanoi.towerOfHanoi: expects parameter "startPole" to be of type string: "number" given',
    );
  });

  it('endPole should raise TypeError when set to invalid type', () => {
    assert.throws(
      () => TowerOfHanoi.towerOfHanoi(3, 'A', 123, 'C'),
      TypeError,
      'TowerOfHanoi.towerOfHanoi: expects parameter "endPole" to be of type string: "number" given',
    );
  });

  it('sparePole should raise TypeError when set to invalid type', () => {
    assert.throws(
      () => TowerOfHanoi.towerOfHanoi(3, 'A', 'B', 123),
      TypeError,
      'TowerOfHanoi.towerOfHanoi: expects parameter "sparePole" to be of type string: "number" given',
    );
  });

  it('should throw exception for negative numDisks', () => {
    assert.throws(
      () => TowerOfHanoi.towerOfHanoi(-1, 'A', 'B', 'C'),
      Error,
      'TowerOfHanoi.towerOfHanoi expects parameter "number" to be a positive integer: "-1" given',
    );
  });

  it('should throw exception for null numDisks', () => {
    assert.throws(
      () => TowerOfHanoi.towerOfHanoi(0, 'A', 'B', 'C'),
      Error,
      'TowerOfHanoi.towerOfHanoi expects parameter "number" to be a positive integer: "0" given',
    );
  });

  it('should throw exception for poles with invalid value', () => {
    assert.throws(
      () => TowerOfHanoi.towerOfHanoi(1, 'X', 'B', 'C'),
      Error,
      'TowerOfHanoi.towerOfHanoi expects pole parameters to contain "A", "B", or "C": "X" given',
    );

    assert.throws(
      () => TowerOfHanoi.towerOfHanoi(1, 'A', 'X', 'C'),
      Error,
      'TowerOfHanoi.towerOfHanoi expects pole parameters to contain "A", "B", or "C": "X" given',
    );

    assert.throws(
      () => TowerOfHanoi.towerOfHanoi(1, 'A', 'B', 'X'),
      Error,
      'TowerOfHanoi.towerOfHanoi expects pole parameters to contain "A", "B", or "C": "X" given',
    );
  });

  it('should return correct Tower of Hanoi sequence', () => {
    for (let i = 0; i < 7; i += 2) {
      assert.deepStrictEqual(
        FIXTURES[i + 1],
        TowerOfHanoi.towerOfHanoi(FIXTURES[i][0], FIXTURES[i][1], FIXTURES[i][2], FIXTURES[i][3]),
      );
    }
  });
});
