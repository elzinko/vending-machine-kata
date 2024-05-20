import {ChangeService} from '../../../src/domain/services/ChangeService';
import {Coin, CoinType, CoinValues} from '../../../src/domain/models/Coin';

describe('ChangeService', () => {
  test('should return an empty array when amount is 0', () => {
    const result = ChangeService.makeChange(0);
    expect(result).toEqual([]);
  });

  test('should return the correct change for amount 75', () => {
    const result = ChangeService.makeChange(75);
    const expected: CoinType[] = ['QUARTER', 'QUARTER', 'QUARTER'];
    expect(result).toEqual(expected);
  });

  test('should return the correct change using biggest coins', () => {
    const amount = 5 * CoinValues.DIME + CoinValues.NICKEL;
    const result = ChangeService.makeChange(amount);
    const expected: CoinType[] = ['QUARTER', 'QUARTER', 'NICKEL'];
    expect(result).toEqual(expected);
  });

  // Does not work as 41 and 1 are allowed amounts that can be computed when using the CoinValues (penny not in it)
  /* test('should return the correct change for amount 45', () => {
    const result = ChangeService.makeChange(41);
    const expected: CoinType[] = ['QUARTER', 'DIME', 'NICKEL', 'NICKEL'];
    expect(result).toEqual(expected);
  });

  test('should return the correct change for amount 1', () => {
    const result = ChangeService.makeChange(1);
    const expected: CoinType[] = ['PENNY'];
    expect(result).toEqual(expected);
  }); */
});
