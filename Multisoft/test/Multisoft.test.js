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
const Multisoft = require('../Multisoft');

describe('Multisoft', () => {
  it('a should raise TypeError when set to invalid type', () => {
    assert.throws(
      () => Multisoft.multisoft(123),
      TypeError,
      'Multisoft.multisoft: expects parameter "a" to be of type string: "number" given',
    );
  });

  it('a should raise an exception when string is too short', () => {
    assert.throws(
      () => Multisoft.multisoft(''),
      Error,
      'Multisoft.multisoft: expects parameter "a" to contain at least two character',
    );
  });

  it('Multisoft should return expected url', () => {
    assert.strictEqual(Multisoft.multisoft('1112031584'), 'https://www.multisoft.se/112358');
  });
});
