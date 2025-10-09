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

const EXPECTED_OBJECT = {
  'header': {
    'alg': 'HS256',
    'typ': 'JWT',
  },
  'claims': {
    'sub': '1234567890',
    'name': 'John Doe',
    'admin': true,
    'iat': 1516239022,
  },
  'signature': 'KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
}

const EXPECTED_STRING = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

const encoder = new JwtEncoder('a-string-secret-at-least-256-bits-long');

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
      const result = encoder.encode(EXPECTED_OBJECT.claims);
      assert.strictEqual(result, EXPECTED_STRING);
    });
  });

  describe('#url-safe encoder', () => {
    it('should produce URL-safe Base64 token and decode it correctly', () => {
      const payload = { data: 'ÿî?>a' };

      const token = encoder.encode(payload);

      // Assert the token is made of three URL-safe Base64URL segments
      assert.match(token, /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);

      assert.notInclude(token, '+');
      assert.notInclude(token, '/');
      assert.notInclude(token, '=');

      const decoded = encoder.decode(token);
      assert.isObject(decoded.claims);
      assert.strictEqual(decoded.claims.data, payload.data);

      assert.isTrue(encoder.isValid(token));
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
      assert.deepStrictEqual(result, EXPECTED_OBJECT);
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
