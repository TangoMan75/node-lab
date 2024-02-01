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
const Payload = require('../src/ValueObject/Payload');

describe('Payload', () => {
  describe('#constructor()', () => {
    it('should create a Payload object with default claims', () => {
      const payload = new Payload();
      assert.strictEqual(typeof payload.claims[Payload.JWT_ID], 'string');
      assert.strictEqual(payload.claims[Payload.JWT_ID].length, Payload.JWT_ID_LENGTH);
      assert.strictEqual(typeof payload.claims[Payload.ISSUED_AT], 'number');
    });

    it('should create a Payload object with custom claims', () => {
      const customClaims = {
        [Payload.ISSUER]: 'custom_issuer',
        [Payload.SUBJECT]: 'custom_subject',
        [Payload.AUDIENCE]: 'custom_audience',
        [Payload.EXPIRATION_TIME]: 1234567890,
        [Payload.NOT_BEFORE]: 987654321,
      };

      const payload = new Payload(customClaims);
      assert.deepStrictEqual(payload.claims, {
        ...customClaims,
        [Payload.JWT_ID]: payload.claims[Payload.JWT_ID], // JWT_ID is still generated
        [Payload.ISSUED_AT]: payload.claims[Payload.ISSUED_AT], // ISSUED_AT is still generated
      });
    });
  });

  describe('#toString()', () => {
    it('should return a JSON string representation of the claims', () => {
      const payload = new Payload();
      const jsonString = payload.toString();
      assert.strictEqual(typeof jsonString, 'string');

      const parsedClaims = JSON.parse(jsonString);
      assert.deepStrictEqual(parsedClaims, payload.claims);
    });
  });

  describe('#toArray()', () => {
    it('should return a copy of the claims object', () => {
      const payload = new Payload();
      const claimsArray = payload.toArray();
      assert.deepStrictEqual(claimsArray, payload.claims);

      // Ensure it's a copy, not a reference
      assert.notStrictEqual(claimsArray, payload.claims);
    });
  });
});
