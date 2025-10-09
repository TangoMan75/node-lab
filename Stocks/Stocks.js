/*
 * This file is part of the TangoMan Node Lab package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Stocks
 *
 * Return an array holding the names of the top three stocks with the best average performance given two separate arrays containing stocks names and prices.
 *
 * Example:
 * const stocks = ["StockA", "StockB", "StockC"];
 * const prices = [
 *     [10, 20, 30],
 *     [5, 15, 25],
 *     [8, 18, 28]
 * ];
 *
 * The average performance of StockA is (10 + 20 + 30) / 3 = 20,
 * StockB is (5 + 15 + 25) / 3 = 15,
 * StockC is (8 + 18 + 28) / 3 = 18. 66...
 *
 * The top three stocks based on average performance are ["StockA", "StockC", "StockB"].
 */
class Stocks {
  /**
   * Technical test: Return top three best average performing stocks from two lists.
   */
  getTopThree(stocks, prices) {
    if (!Array.isArray(stocks)) {
      throw new TypeError(`${this.constructor.name}.getTopThree: expects parameter "stocks" to be of type Array: "${typeof stocks}" given`);
    }

    if (!Array.isArray(prices)) {
      throw new TypeError(`${this.constructor.name}.getTopThree: expects parameter "prices" to be of type Array: "${typeof prices}" given`);
    }

    if (stocks.length !== prices.length) {
      throw new Error(`${this.constructor.name}.getTopThree: expects both arrays to have the same length`);
    }

    if (stocks.length < 3) {
      throw new Error(`${this.constructor.name}.getTopThree: expects arrays to contain at least three items`);
    }

    const result = {};

    // storing average stock performance in object as "stock_name => average"
    stocks.forEach((stock, i) => {
      result[stock] = prices[i].reduce((sum, price) => sum + price, 0) / prices[i].length;
    });

    // sorting the result object by average in descending order
    const sortedResult = Object.entries(result)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    // returning an array of top three stock names
    return sortedResult.map((entry) => entry[0]);
  }
}

module.exports = new Stocks();
