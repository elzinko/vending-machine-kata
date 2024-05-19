import {CurrencyConversionService} from '../../../src/domain/services/CurrencyConversionService';

describe('CurrencyConversionService', () => {
  test('should convert 0 cents to $0.00', () => {
    expect(CurrencyConversionService.centsToDollars(0)).toBe('0.00');
  });

  test('should convert 25 cents to $0.25', () => {
    expect(CurrencyConversionService.centsToDollars(25)).toBe('0.25');
  });

  test('should convert 100 cents to $1.00', () => {
    expect(CurrencyConversionService.centsToDollars(100)).toBe('1.00');
  });

  test('should convert 123 cents to $1.23', () => {
    expect(CurrencyConversionService.centsToDollars(123)).toBe('1.23');
  });
});
