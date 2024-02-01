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
const JwtEncoder = require('../src/Encoder/JwtEncoder');

const EXPECTED_ARRAY = {
  header: {
    alg: 'HS256',
    typ: 'JWT',
  },
  claims: { foo: 'bar' },
  signature: '76dc5633a308720a1e3201fceed1afb0d0d8e9c1d62fa3065b82de62f9e6d490',
};

const EXPECTED_STRING = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.76dc5633a308720a1e3201fceed1afb0d0d8e9c1d62fa3065b82de62f9e6d490';

const encoder = new JwtEncoder('secret');

describe('JwtEncoder', () => {
  describe('#constructor()', () => {
    it('secret should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => new JwtEncoder(123),
        TypeError,
        'JwtEncoder: expects parameter "secret" to be of type string: "number" given',
      );
    });
  });

  describe('#encode()', () => {
    it('payload should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => encoder.encode('invalid_type'),
        TypeError,
        'JwtEncoder.encode: expects parameter "payload" to be of type object: "string" given',
      );
    });

    it('should encode and return expected result', () => {
      const result = encoder.encode({ foo: 'bar' });
      assert.strictEqual(result, EXPECTED_STRING);
    });
  });

  describe('#decode()', () => {
    it('token should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => encoder.decode(123),
        TypeError,
        'JwtEncoder.decode: expects parameter "token" to be of type string: "number" given',
      );
    });

    it('should decode and return expected result', () => {
      const result = encoder.decode(EXPECTED_STRING);
      assert.deepStrictEqual(result, EXPECTED_ARRAY);
    });
  });

  describe('#isValid()', () => {
    it('token should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => encoder.isValid(123),
        TypeError,
        'JwtEncoder.isValid: expects parameter "token" to be of type string: "number" given',
      );
    });

    it('should validate and return expected result', () => {
      const result = encoder.isValid(EXPECTED_STRING);
      assert.strictEqual(result, true);
    });
  });

  describe('#sign()', () => {
    it('hashAlgorithm should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => encoder.sign(123, 'encodedHeader', 'encodedPayload'),
        TypeError,
        'JwtEncoder.sign: expects parameter "hashAlgorithm" to be of type string: "number" given',
      );
    });

    it('encodedHeader should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => encoder.sign('hashAlgorithm', 123, 'encodedPayload'),
        TypeError,
        'JwtEncoder.sign: expects parameter "encodedHeader" to be of type string: "number" given',
      );
    });

    it('encodedPayload should raise TypeError when set to invalid type', () => {
      assert.throws(
        () => encoder.sign('hashAlgorithm', 'encodedHeader', 123),
        TypeError,
        'JwtEncoder.sign: expects parameter "encodedPayload" to be of type string: "number" given',
      );
    });
  });
});
