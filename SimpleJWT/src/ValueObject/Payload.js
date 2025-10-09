/**
 * Payload Value Object
 */
module.exports = class Payload {
  static get ISSUER() { return 'iss'; } // (Issuer) Claim

  static get SUBJECT() { return 'sub'; } // (Subject) Claim

  static get AUDIENCE() { return 'aud'; } // (Audience) Claim

  static get EXPIRATION_TIME() { return 'exp'; } // (Expiration Time) Claim

  static get NOT_BEFORE() { return 'nbf'; } // (Not Before) Claim

  static get ISSUED_AT() { return 'iat'; } // (Issued At) Claim

  static get JWT_ID() { return 'jti'; } // (JWT ID) Claim

  static get JWT_ID_LENGTH() { return 12; }

  constructor(claims = {}) {
    const defaultClaims = {
      [Payload.JWT_ID]: Array.from({ length: Payload.JWT_ID_LENGTH }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      [Payload.ISSUED_AT]: Math.floor(Date.now() / 1000),
    };

    this.claims = { ...defaultClaims, ...claims };
  }

  toString() {
    return JSON.stringify(this.claims);
  }

  toArray() {
    return { ...this.claims };
  }
};
