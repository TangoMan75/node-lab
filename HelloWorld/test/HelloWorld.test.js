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
const HelloWorld = require('../HelloWorld');

describe('HelloWorld', () => {
  it('helloWorld should return "Hello world!"', () => {
    assert.strictEqual(HelloWorld.helloWorld(), 'Hello world!');
  });
});
