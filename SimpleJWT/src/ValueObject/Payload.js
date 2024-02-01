/**
 * Payload Value Object
 */
module.exports = class Payload {
  static ISSUER = 'iss'; // (Issuer) Claim

  static SUBJECT = 'sub'; // (Subject) Claim

  static AUDIENCE = 'aud'; // (Audience) Claim

  static EXPIRATION_TIME = 'exp'; // (Expiration Time) Claim

  static NOT_BEFORE = 'nbf'; // (Not Before) Claim

  static ISSUED_AT = 'iat'; // (Issued At) Claim

  static JWT_ID = 'jti'; // (JWT ID) Claim

  static JWT_ID_LENGTH = 12;

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
