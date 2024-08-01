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
const MinTemperature = require('../MinTemperature');

describe('MinTemperature', () => {
  describe('#getClosestToZero()', () => {
    it('should raise TypeError when array is set to invalid type', () => {
      assert.throws(
        () => MinTemperature.getClosestToZero('invalid_type', 'thing_to_find'),
        TypeError,
        'MinTemperature.getClosestToZero: expects parameter "temperatures" to be of type Array: "string" given',
      );
    });

    it('should raise exception when temperature array is empty', () => {
      assert.throws(
        () => MinTemperature.getClosestToZero([]),
        Error,
        'MinTemperature.getClosestToZero expects parameter "temperatures" to contain at least one value',
      );
    });

    it('should raise exception when given invalid temperature array', () => {
      assert.throws(
        () => MinTemperature.getClosestToZero([1, 'a']),
        Error,
        'MinTemperature.getClosestToZero expects parameter "temperatures" to contain integers only',
      );
    });

    it('should return the correct result for one negative temperature', () => {
      assert.strictEqual(MinTemperature.getClosestToZero([-273]), -273);
    });

    it('should return the correct result for two negative temperatures', () => {
      assert.strictEqual(MinTemperature.getClosestToZero([-10, -10]), -10);
    });

    it('should return the correct result for a simple array', () => {
      assert.strictEqual(MinTemperature.getClosestToZero([1, -2, -8, 4, 5]), 1);
    });

    it('should return the correct result for a complex array', () => {
      assert.strictEqual(MinTemperature.getClosestToZero([-5, -4, -2, 12, -40, 4, 2, 18, 11, 5]), 2);
    });
  });

  describe('#getMinimumPositiveTemperature()', () => {
    it('should raise exception when temperature array is empty for minimum positive temperature', () => {
      assert.throws(
        () => MinTemperature.getMinimumPositiveTemperature([]),
        Error,
        'MinTemperature.getMinimumPositiveTemperature expects parameter "temperatures" to contain at least one value',
      );
    });

    it('should raise exception when given invalid temperature array for minimum positive temperature', () => {
      assert.throws(
        () => MinTemperature.getMinimumPositiveTemperature([1, 'a']),
        Error,
        'MinTemperature.getMinimumPositiveTemperature expects parameter "temperatures" to contain integers only',
      );
    });

    it('should raise exception when temperature array contains no positive values for minimum positive temperature', () => {
      assert.throws(
        () => MinTemperature.getMinimumPositiveTemperature([-273]),
        Error,
        'MinTemperature.getMinimumPositiveTemperature expects parameter "temperatures" to contain at least one positive value',
      );
    });

    it('should return the correct result for a simple array for minimum positive temperature', () => {
      assert.strictEqual(MinTemperature.getMinimumPositiveTemperature([1, -2, -8, 4, 5]), 1);
    });

    it('should return the correct result for a complex array for minimum positive temperature', () => {
      assert.strictEqual(MinTemperature.getMinimumPositiveTemperature([-5, -4, -2, 12, -40, 4, 2, 18, 11, 5]), 2);
    });
  });
});
