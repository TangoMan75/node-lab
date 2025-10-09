const crypto = require('crypto');

/**
 * Simple JWT Implementation
 *
 * https://www.rfc-editor.org/rfc/rfc7519
 */
module.exports = class JwtEncoder {
  static get VALID_ALGOS() {
    return {
      HS256: 'sha256',
      HS384: 'sha384',
      HS512: 'sha512',
    };
  }

  static get DEFAULT_HEADER() {
    return {
      alg: 'HS256',
      typ: 'JWT',
    };
  }

  constructor(secret) {
    if (typeof secret !== 'string') {
      throw new TypeError(`${this.constructor.name}: expects parameter "secret" to be of type string: "${typeof secret}" given`);
    }

    this.secret = secret;
  }

  /**
   * Base64url encode per RFC 7515 (no padding, URL-safe characters)
   * Accepts a Buffer or string, returns a base64url string
   */
  static base64urlEncode(input) {
    const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input), 'utf8');
    return buf
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  /**
   * Base64url decode per RFC 7515
   * Returns a UTF-8 string
   */
  static base64urlDecode(input) {
    if (typeof input !== 'string') return '';
    let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with '=' to make length a multiple of 4
    const padLen = (4 - (b64.length % 4)) % 4;
    if (padLen) b64 = b64 + '='.repeat(padLen);
    return Buffer.from(b64, 'base64').toString('utf8');
  }

  encode(payload, header = {}) {
    if (typeof payload !== 'object') {
      throw new TypeError(`${this.constructor.name}.encode: expects parameter "payload" to be of type object: "${typeof payload}" given`);
    }

    const mergedHeader = { ...JwtEncoder.DEFAULT_HEADER, ...header };

    const encodedHeader = JwtEncoder.base64urlEncode(JSON.stringify(mergedHeader));
    const encodedPayload = JwtEncoder.base64urlEncode(JSON.stringify(payload));
    const signature = this.sign(mergedHeader.alg, encodedHeader, encodedPayload);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  decode(token) {
    if (typeof token !== 'string') {
      throw new TypeError(`${this.constructor.name}.decode: expects parameter "token" to be of type string: "${typeof token}" given`);
    }

    const [encodedHeader, encodedPayload, signature] = token.split('.');

    return {
      header: JSON.parse(JwtEncoder.base64urlDecode(encodedHeader) || '{}'),
      claims: JSON.parse(JwtEncoder.base64urlDecode(encodedPayload) || '{}'),
      signature: signature || '',
    };
  }

  isValid(token) {
    if (typeof token !== 'string') {
      throw new TypeError(`${this.constructor.name}.isValid: expects parameter "token" to be of type string: "${typeof token}" given`);
    }

    const decoded = this.decode(token);
    const [encodedHeader, encodedPayload] = token.split('.');
    const signature = this.sign(decoded.header.alg || '', encodedHeader, encodedPayload);

    return signature === decoded.signature;
  }

  sign(hashAlgorithm, encodedHeader, encodedPayload) {
    if (typeof hashAlgorithm !== 'string') {
      throw new TypeError(`${this.constructor.name}.sign: expects parameter "hashAlgorithm" to be of type string: "${typeof hashAlgorithm}" given`);
    }

    if (typeof encodedHeader !== 'string') {
      throw new TypeError(`${this.constructor.name}.sign: expects parameter "encodedHeader" to be of type string: "${typeof encodedHeader}" given`);
    }

    if (typeof encodedPayload !== 'string') {
      throw new TypeError(`${this.constructor.name}.sign: expects parameter "encodedPayload" to be of type string: "${typeof encodedPayload}" given`);
    }

    if (!(hashAlgorithm in JwtEncoder.VALID_ALGOS)) {
      throw new Error('Invalid Hash Algorithm.');
    }

    const message = `${encodedHeader}.${encodedPayload}`;
    return crypto
      .createHmac(JwtEncoder.VALID_ALGOS[hashAlgorithm], this.secret)
      .update(message)
      .digest('base64url');
  }
};
