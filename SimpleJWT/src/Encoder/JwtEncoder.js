const crypto = require('crypto');

/**
 * Simple JWT Implementation
 *
 * https://www.rfc-editor.org/rfc/rfc7519
 */
module.exports = class JwtEncoder {
  static VALID_ALGOS = {
    HS256: 'sha256',
    HS384: 'sha384',
    HS512: 'sha512',
  };

  static DEFAULT_HEADER = {
    alg: 'HS256',
    typ: 'JWT',
  };

  constructor(secret) {
    if (typeof secret !== 'string') {
      throw new TypeError(`${this.constructor.name}: expects parameter "secret" to be of type string: "${typeof secret}" given`);
    }

    this.secret = secret;
  }

  encode(payload, header = {}) {
    if (typeof payload !== 'object') {
      throw new TypeError(`${this.constructor.name}.encode: expects parameter "payload" to be of type object: "${typeof payload}" given`);
    }

    const mergedHeader = { ...JwtEncoder.DEFAULT_HEADER, ...header };

    const encodedHeader = btoa(JSON.stringify(mergedHeader)).replace(/=+$/, '');
    const encodedPayload = btoa(JSON.stringify(payload)).replace(/=+$/, '');
    const signature = this.sign(mergedHeader.alg, encodedHeader, encodedPayload);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  decode(token) {
    if (typeof token !== 'string') {
      throw new TypeError(`${this.constructor.name}.decode: expects parameter "token" to be of type string: "${typeof token}" given`);
    }

    const [encodedHeader, encodedPayload, signature] = token.split('.');

    return {
      header: JSON.parse(atob(encodedHeader) || '{}'),
      claims: JSON.parse(atob(encodedPayload) || '{}'),
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
    return crypto.createHmac(JwtEncoder.VALID_ALGOS[hashAlgorithm], this.secret).update(message).digest('hex');
  }
};
