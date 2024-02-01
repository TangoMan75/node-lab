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
const PokerHandStrengthCalculator = require('../Poker');

describe('PokerHandStrengthCalculator', () => {
  it('should raise TypeError when communityCards is set to invalid type', () => {
    assert.throws(
      () => new PokerHandStrengthCalculator('invalid_type', []),
      TypeError,
      'PokerHandStrengthCalculator: expects parameter "communityCards" to be of type Array: "string" given',
    );
  });

  it('should raise TypeError when playerCards is set to invalid type', () => {
    assert.throws(
      () => new PokerHandStrengthCalculator([], 'invalid_type'),
      TypeError,
      'PokerHandStrengthCalculator: expects parameter "playerCards" to be of type Array: "string" given',
    );
  });

  it('should evaluate Royal Flush', () => {
    const communityCards = [['2', 'H'], ['3', 'H'], ['T', 'H'], ['J', 'H'], ['Q', 'H']];
    const playerCards = [['A', 'H'], ['K', 'H']];

    const expectedRank = 9;
    const expectedHand = [['A', 'H'], ['K', 'H'], ['Q', 'H'], ['J', 'H'], ['T', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Royal Flush (edge case)', () => {
    const communityCards = [['A', 'C'], ['A', 'S'], ['T', 'H'], ['J', 'H'], ['Q', 'H']];
    const playerCards = [['A', 'H'], ['K', 'H']];

    const expectedRank = 9;
    const expectedHand = [['A', 'H'], ['K', 'H'], ['Q', 'H'], ['J', 'H'], ['T', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Straight Flush', () => {
    const communityCards = [['2', 'H'], ['3', 'H'], ['4', 'H'], ['5', 'H'], ['6', 'H']];
    const playerCards = [['7', 'H'], ['8', 'H']];

    const expectedRank = 8;
    const expectedHand = [['8', 'H'], ['7', 'H'], ['6', 'H'], ['5', 'H'], ['4', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Wheel Flush', () => {
    const communityCards = [['2', 'H'], ['3', 'H'], ['4', 'H'], ['5', 'C'], ['6', 'C']];
    const playerCards = [['A', 'H'], ['5', 'H']];

    const expectedRank = 8;
    const expectedHand = [['5', 'H'], ['4', 'H'], ['3', 'H'], ['2', 'H'], ['A', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Wheel Flush (edge case)', () => {
    const communityCards = [['2', 'H'], ['3', 'H'], ['4', 'H'], ['5', 'H'], ['T', 'C']];
    const playerCards = [['A', 'C'], ['A', 'H']];

    const expectedRank = 8;
    const expectedHand = [['5', 'H'], ['4', 'H'], ['3', 'H'], ['2', 'H'], ['A', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Four of a Kind', () => {
    const communityCards = [['2', 'H'], ['2', 'D'], ['2', 'S'], ['3', 'C'], ['6', 'H']];
    const playerCards = [['A', 'C'], ['2', 'C']];

    const expectedRank = 7;
    const expectedHand = [['2', 'S'], ['2', 'H'], ['2', 'D'], ['2', 'C'], ['A', 'C']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Full House', () => {
    const communityCards = [['2', 'H'], ['2', 'D'], ['3', 'S'], ['3', 'C'], ['3', 'H']];
    const playerCards = [['7', 'H'], ['8', 'D']];

    const expectedRank = 6;
    const expectedHand = [['3', 'S'], ['3', 'H'], ['3', 'C'], ['2', 'H'], ['2', 'D']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Flush', () => {
    const communityCards = [['2', 'H'], ['4', 'H'], ['6', 'H'], ['8', 'C'], ['T', 'D']];
    const playerCards = [['A', 'H'], ['8', 'H']];

    const expectedRank = 5;
    const expectedHand = [['A', 'H'], ['8', 'H'], ['6', 'H'], ['4', 'H'], ['2', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Straight', () => {
    const communityCards = [['2', 'H'], ['3', 'D'], ['4', 'H'], ['5', 'C'], ['6', 'H']];
    const playerCards = [['7', 'S'], ['8', 'H']];

    const expectedRank = 4;
    const expectedHand = [['8', 'H'], ['7', 'S'], ['6', 'H'], ['5', 'C'], ['4', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Wheel', () => {
    const communityCards = [['2', 'H'], ['3', 'C'], ['4', 'H'], ['T', 'C'], ['Q', 'C']];
    const playerCards = [['A', 'H'], ['5', 'C']];

    const expectedRank = 4;
    const expectedHand = [['5', 'C'], ['4', 'H'], ['3', 'C'], ['2', 'H'], ['A', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Wheel (edge case)', () => {
    const communityCards = [['2', 'H'], ['3', 'C'], ['4', 'H'], ['5', 'C'], ['Q', 'C']];
    const playerCards = [['A', 'H'], ['6', 'C']];

    const expectedRank = 4;
    const expectedHand = [['6', 'C'], ['5', 'C'], ['4', 'H'], ['3', 'C'], ['2', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Three of a Kind', () => {
    const communityCards = [['2', 'H'], ['3', 'D'], ['3', 'H'], ['3', 'C'], ['6', 'H']];
    const playerCards = [['7', 'S'], ['8', 'H']];

    const expectedRank = 3;
    const expectedHand = [['3', 'H'], ['3', 'D'], ['3', 'C'], ['8', 'H'], ['7', 'S']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate Two Pair', () => {
    const communityCards = [['2', 'H'], ['2', 'D'], ['3', 'H'], ['3', 'C'], ['6', 'H']];
    const playerCards = [['7', 'S'], ['8', 'H']];

    const expectedRank = 2;
    const expectedHand = [['3', 'H'], ['3', 'C'], ['2', 'H'], ['2', 'D'], ['8', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate One Pair', () => {
    const communityCards = [['2', 'H'], ['3', 'D'], ['4', 'H'], ['4', 'C'], ['6', 'H']];
    const playerCards = [['7', 'S'], ['8', 'H']];

    const expectedRank = 1;
    const expectedHand = [['4', 'H'], ['4', 'C'], ['8', 'H'], ['7', 'S'], ['6', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });

  it('should evaluate High Card', () => {
    const communityCards = [['2', 'C'], ['4', 'D'], ['6', 'H'], ['8', 'C'], ['T', 'H']];
    const playerCards = [['A', 'H'], ['K', 'H']];

    const expectedRank = 0;
    const expectedHand = [['A', 'H'], ['K', 'H'], ['T', 'H'], ['8', 'C'], ['6', 'H']];

    const handEvaluator = new PokerHandStrengthCalculator(communityCards, playerCards);
    assert.strictEqual(handEvaluator.getRank(), expectedRank);
    assert.deepStrictEqual(handEvaluator.getHand(), expectedHand);
  });
});
