import {CoinType, CoinValues} from '../models/Coin';

export class ChangeService {
  /**
   * This method returns the minimum number of coins needed to make change for a given amount.
   * @param amount The amount for which to make change
   * @returns An array of CoinType values representing the change
   * @example
   * ChangeService.makeChange(75); // ['QUARTER', 'QUARTER', 'QUARTER']
   * ChangeService.makeChange(41); // ['QUARTER', 'DIME', 'NICKEL', 'NICKEL']
   * ChangeService.makeChange(0); // []
   * ChangeService.makeChange(1); // ['PENNY']
   * @throws Error if the amount is not a multiple of the smallest coin value
   * @remarks
   * This method uses a greedy algorithm to make change. It sorts the coins by value in descending order and then iterates over the coins, adding the maximum number of each coin to the result until the amount is zero.
   */
  static makeChange(amount: number, allowedCoins: CoinType[]): CoinType[] {
    ChangeService.assertAmountIsMultipleOfSmallestCoin(amount, allowedCoins);

    return allowedCoins
      .sort(
        (a, b) =>
          CoinValues[b as keyof typeof CoinValues] -
          CoinValues[a as keyof typeof CoinValues]
      )
      .reduce((acc, coin: CoinType) => {
        const count = Math.floor(
          amount / CoinValues[coin as keyof typeof CoinValues]
        );
        amount -= count * CoinValues[coin as keyof typeof CoinValues];
        return acc.concat(Array(count).fill(coin));
      }, [] as CoinType[]);
  }

  /**
   * Check if an amount is a multiple of the smallest coin value, given a list of allowed coins.
   * @param amount the amount to check
   * @param allowedCoins list of allowed coins
   */
  static assertAmountIsMultipleOfSmallestCoin(
    amount: number,
    allowedCoins: CoinType[]
  ) {
    const smallestCoin = allowedCoins.reduce(
      (smallest, coin) =>
        CoinValues[coin as keyof typeof CoinValues] <
        CoinValues[smallest as keyof typeof CoinValues]
          ? coin
          : smallest,
      allowedCoins[0]
    );

    if (amount % CoinValues[smallestCoin as keyof typeof CoinValues] !== 0) {
      throw new Error('Amount must be a multiple of the smallest coin');
    }
  }

  static computeCoinsAmount(coins: CoinType[]): number {
    return coins.reduce(
      (total, coin) => total + CoinValues[coin as keyof typeof CoinValues],
      0
    );
  }
}
