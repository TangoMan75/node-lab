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
const Rot13 = require('../Rot13');

describe('Rot13', () => {
  it('text should raise TypeError when set to invalid type', () => {
    assert.throws(
      () => Rot13.rot13(123),
      TypeError,
      'Rot13.rot13: expects parameter "text" to be of type string: "number" given',
    );
  });

  it('should encrypt text using Rot13', () => {
    assert.strictEqual(Rot13.rot13('Hello, World!'), 'Uryyb, Jbeyq!');
  });

  it('should decrypt text using Rot13', () => {
    assert.strictEqual(Rot13.rot13('Uryyb, Jbeyq!'), 'Hello, World!');
  });

  it('should handle Rot13 edge cases', () => {
    assert.strictEqual(Rot13.rot13(''), '');
    assert.strictEqual(Rot13.rot13('123'), '123');
    assert.strictEqual(Rot13.rot13('+-*/'), '+-*/');
  });
});
