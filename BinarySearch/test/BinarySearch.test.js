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
const BinarySearch = require('../BinarySearch');

describe('TestBinarySearch', () => {
  it('should raise TypeError when array is set to invalid type', () => {
    assert.throws(
      () => BinarySearch.binarySearch('invalid_type', 'thing_to_find'),
      TypeError,
      'BinarySearch.binarySearch: expects parameter "array" to be of type Array: "string" given',
    );
  });

  it('should raise ValueError when thing_to_find is empty', () => {
    const array = [1, 2, 3, 4, 5];
    assert.throws(
      () => BinarySearch.binarySearch(array, null),
      Error,
      'BinarySearch.binarySearch: argument "thingToFind" cannot be empty',
    );
  });

  it('should raise TypeError when start is set to invalid type', () => {
    const array = [1, 2, 3, 4, 5];
    assert.throws(
      () => BinarySearch.binarySearch(array, 'thing_to_find', 'invalid_type'),
      TypeError,
      'BinarySearch.binarySearch: expects parameter "start" to be of type number: "string" given',
    );
  });

  it('should raise ValueError when start is lower than zero', () => {
    const array = [1, 2, 3, 4, 5];
    assert.throws(
      () => BinarySearch.binarySearch(array, 'thing_to_find', -1),
      Error,
      'BinarySearch.binarySearch: expects parameter "start" to be greater than or equal to 0: "-1" given',
    );
  });

  it('should raise TypeError when end is set to invalid type', () => {
    const array = [1, 2, 3, 4, 5];
    assert.throws(
      () => BinarySearch.binarySearch(array, 'thing_to_find', 0, 'invalid_type'),
      TypeError,
      'BinarySearch.binarySearch: expects parameter "end" to be of type number: "string" given',
    );
  });

  it('should return true if value is found', () => {
    const array = [1, 2, 3, 4, 5];
    assert.strictEqual(BinarySearch.binarySearch(array, 3), true);
  });

  it('should return false if value is not found', () => {
    const array = [1, 2, 3, 4, 5];
    assert.strictEqual(BinarySearch.binarySearch(array, 0), false);
  });

  it('should work on empty array', () => {
    const array = [];
    assert.strictEqual(BinarySearch.binarySearch(array, 'thing_to_find'), false);
  });

  it('should return true with start and end indices', () => {
    const array = [1, 2, 3, 4, 5];
    assert.strictEqual(BinarySearch.binarySearch(array, 4, 2, 4), true);
  });
});
