import {ChangeService} from '../../../src/domain/services/ChangeService';
import {CoinType, CoinValues} from '../../../src/domain/models/Coin';

describe('ChangeService', () => {
  const allowedCoinsExample = ['QUARTER', 'DIME', 'NICKEL'] as CoinType[];

  test('should return an empty array when amount is 0', () => {
    const result = ChangeService.makeChange(0, allowedCoinsExample);
    expect(result).toEqual([]);
  });

  test('should return the correct change for amount 75', () => {
    const result = ChangeService.makeChange(75, allowedCoinsExample);
    const expected: CoinType[] = ['QUARTER', 'QUARTER', 'QUARTER'];
    expect(result).toEqual(expected);
  });

  test('should return the correct change using biggest coins', () => {
    const amount = 5 * CoinValues.DIME + CoinValues.NICKEL;
    const result = ChangeService.makeChange(amount, allowedCoinsExample);
    const expected: CoinType[] = ['QUARTER', 'QUARTER', 'NICKEL'];
    expect(result).toEqual(expected);
  });

  test('should return the correct change for amount 1', () => {
    expect(() => ChangeService.makeChange(1, allowedCoinsExample)).toThrow(
      'Amount must be a multiple of the smallest coin'
    );
  });

  test('should thorw an error when asking to give monney back', () => {
    expect(() => ChangeService.makeChange(51, allowedCoinsExample)).toThrow(
      'Amount must be a multiple of the smallest coin'
    );
  });

  test('should return the correct change for amount 45', () => {
    const result = ChangeService.makeChange(45, allowedCoinsExample);
    const expected: CoinType[] = ['QUARTER', 'DIME', 'DIME'];
    expect(result).toEqual(expected);
  });
});
