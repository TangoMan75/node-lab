/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * ROT13 is a simple letter substitution cipher that shifts each letter 13 positions forward in the alphabet. It's a weak
 * encryption method commonly used for obfuscation and hiding spoilers. Applying ROT13 twice reverses the encryption.
 */
class Rot13 {
  rot13(text) {
    if (typeof text !== 'string') {
      throw new TypeError(`${this.constructor.name}.rot13: expects parameter "text" to be of type string: "${typeof text}" given`);
    }

    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z]/.test(char)) {
        const asciiOffset = char.charCodeAt() <= 90 ? 65 : 97;
        const rotated = ((char.charCodeAt() - asciiOffset + 13) % 26) + asciiOffset;
        result += String.fromCharCode(rotated);
      } else {
        result += char;
      }
    }

    return result;
  }
}

module.exports = new Rot13();
