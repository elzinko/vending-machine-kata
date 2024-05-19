export class CurrencyConversionService {
  static centsToDollars(cents: number): string {
    return (cents / 100).toFixed(2);
  }
}
