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
   * @remarks
   * This method uses a greedy algorithm to make change. It sorts the coins by value in descending order and then iterates over the coins, adding the maximum number of each coin to the result until the amount is zero.
   */
  static makeChange(amount: number): CoinType[] {
    const coinTypes = Object.keys(CoinValues) as CoinType[];

    return coinTypes
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
}
