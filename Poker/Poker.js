/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = class PokerHandStrengthCalculator {
  static get RANKS() {
    return new Map([
      ['A', 14],
      ['K', 13],
      ['Q', 12],
      ['J', 11],
      ['T', 10],
      ['9', 9],
      ['8', 8],
      ['7', 7],
      ['6', 6],
      ['5', 5],
      ['4', 4],
      ['3', 3],
      ['2', 2],
    ]);
  }

  static get SUITS() {
    return new Map([
      ['S', 4],
      ['H', 3],
      ['D', 2],
      ['C', 1],
    ]);
  }

  static get HANDS() {
    return [
      'High card',
      'Pair',
      'Two pair',
      'Three of a kind',
      'Straight',
      'Flush',
      'Full House',
      'Four of a kind',
      'Straight flush',
      'Royal flush',
    ];
  }

  constructor(communityCards, playerCards) {
    if (!Array.isArray(communityCards)) {
      throw new TypeError(`${this.constructor.name}: expects parameter "communityCards" to be of type Array: "${typeof communityCards}" given`);
    }

    if (!Array.isArray(playerCards)) {
      throw new TypeError(`${this.constructor.name}: expects parameter "playerCards" to be of type Array: "${typeof playerCards}" given`);
    }

    this.communityCards = communityCards;
    this.playerCards = playerCards;
    this.hand = [];
    this.rank = null;
    this.evaluateHand();
  }

  evaluateHand() {
    const cards = this.sortCards([...this.communityCards, ...this.playerCards]);

    const straightFlush = this.checkStraightFlush(cards);
    if (straightFlush && straightFlush[0][0] === 'A') {
      this.rank = 9;
      this.hand = straightFlush;
      return;
    }

    if (straightFlush) {
      this.rank = 8;
      this.hand = straightFlush;
      return;
    }

    const fourOfAKind = this.checkFourOfAKind(cards);
    if (fourOfAKind) {
      this.rank = 7;
      this.hand = fourOfAKind;
      return;
    }

    const fullHouse = this.checkFullHouse(cards);
    if (fullHouse) {
      this.rank = 6;
      this.hand = fullHouse;
      return;
    }

    const flush = this.checkFlush(cards);
    if (flush) {
      this.rank = 5;
      this.hand = flush;
      return;
    }

    const straight = this.checkStraight(cards);
    if (straight) {
      this.rank = 4;
      this.hand = straight;
      return;
    }

    const threeOfAKind = this.checkThreeOfAKind(cards);
    if (threeOfAKind) {
      this.rank = 3;
      this.hand = threeOfAKind;
      return;
    }

    const twoPair = this.checkTwoPair(cards);
    if (twoPair) {
      this.rank = 2;
      this.hand = twoPair;
      return;
    }

    const onePair = this.checkOnePair(cards);
    if (onePair) {
      this.rank = 1;
      this.hand = onePair;
      return;
    }

    this.rank = 0;
    this.hand = cards.slice(0, 5);
  }

  sortCards(cards) {
    return cards.sort((a, b) => {
      const rankComparison = PokerHandStrengthCalculator.RANKS.get(b[0]) - PokerHandStrengthCalculator.RANKS.get(a[0]);
      const suitComparison = PokerHandStrengthCalculator.SUITS.get(b[1]) - PokerHandStrengthCalculator.SUITS.get(a[1]);
      return rankComparison !== 0 ? rankComparison : suitComparison;
    });
  }

  checkStraightFlush(cards) {
    const flush = this.getFlush(cards);
    if (!flush) {
      return null;
    }

    const straightFlush = this.checkStraight(flush);
    if (!straightFlush) {
      return null;
    }

    return straightFlush;
  }

  checkFourOfAKind(cards) {
    const rankCounts = new Map();
    cards.forEach((card) => {
      const rank = card[0];
      rankCounts.set(rank, (rankCounts.get(rank) || 0) + 1);
    });

    let result = null;
    rankCounts.forEach((count, rank) => {
      if (count === 4) {
        const kicker = cards.filter((card) => card[0] !== rank);
        result = [...cards.filter((card) => card[0] === rank), ...kicker.slice(0, 1)];
      }
    });

    return result;
  }

  checkFullHouse(cards) {
    const rankCounts = new Map();
    cards.forEach((card) => {
      const rank = card[0];
      rankCounts.set(rank, (rankCounts.get(rank) || 0) + 1);
    });

    let threeOfAKind = null;
    let pair = null;

    rankCounts.forEach((count, rank) => {
      if (count === 3) {
        threeOfAKind = cards.filter((card) => card[0] === rank);
      } else if (count === 2) {
        pair = cards.filter((card) => card[0] === rank);
      }
    });

    if (!(threeOfAKind && pair)) {
      return null;
    }

    return [...threeOfAKind, ...pair];
  }

  getFlush(cards) {
    const suitCounts = new Map();
    cards.forEach((card) => {
      const suit = card[1];
      suitCounts.set(suit, (suitCounts.get(suit) || 0) + 1);
    });

    let result = null;
    suitCounts.forEach((count, suit) => {
      if (count >= 5) {
        result = cards.filter((card) => card[1] === suit);
      }
    });

    return result;
  }

  checkFlush(cards) {
    const flush = this.getFlush(cards);
    return flush ? flush.slice(-5) : null;
  }

  checkStraight(cards) {
    const ranks = cards.map((card) => card[0]);
    const rankOrder = Array.from(PokerHandStrengthCalculator.RANKS.keys()).join('');

    for (let i = 0; i < cards.length - 4; ++i) {
      const slicedRanks = ranks.slice(i, i + 5);
      if (rankOrder.includes(slicedRanks.join(''))) {
        return cards.slice(i, i + 5);
      }
    }

    if (ranks.join('').includes('5432') && cards[0][0] === 'A') {
      return [...cards.slice(-4), cards[0]];
    }

    return null;
  }

  checkThreeOfAKind(cards) {
    const rankCounts = new Map();
    cards.forEach((card) => {
      const rank = card[0];
      rankCounts.set(rank, (rankCounts.get(rank) || 0) + 1);
    });

    let threeOfAKind = null;
    let kicker = null;

    Array.from(rankCounts).every(([rank, count]) => {
      if (count === 3) {
        threeOfAKind = cards.filter((card) => card[0] === rank);
        kicker = cards.filter((card) => card[0] !== rank);
        return false;
      }
      return true;
    });

    if (!threeOfAKind) {
      return null;
    }

    return [...threeOfAKind, ...kicker.slice(0, 2)];
  }

  checkTwoPair(cards) {
    const rankCounts = new Map();
    cards.forEach((card) => {
      const rank = card[0];
      rankCounts.set(rank, (rankCounts.get(rank) || 0) + 1);
    });

    const pairs = Array.from(rankCounts.keys()).filter((rank) => rankCounts.get(rank) === 2);

    if (pairs.length < 2) {
      return null;
    }

    const highPair = cards.filter((card) => card[0] === pairs[0]);
    const lowPair = cards.filter((card) => card[0] === pairs[1]);
    const kicker = cards.filter((card) => !pairs.includes(card[0]));

    return [...highPair, ...lowPair, kicker[0]];
  }

  checkOnePair(cards) {
    const rankCounts = new Map();
    cards.forEach((card) => {
      const rank = card[0];
      rankCounts.set(rank, (rankCounts.get(rank) || 0) + 1);
    });

    let result = null;

    rankCounts.forEach((count, rank) => {
      if (count === 2) {
        const pair = cards.filter((card) => card[0] === rank);
        const kicker = cards.filter((card) => card[0] !== rank);
        result = [...pair, ...kicker.slice(0, 3)];
      }
    });

    return result;
  }

  getRank() {
    return this.rank;
  }

  getHand() {
    return this.hand;
  }
};
