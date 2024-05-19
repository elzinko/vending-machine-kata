import {InsertCoinInterface} from '../interfaces/InsertCoinInterface';
import {CurrencyConversionService} from '../domain/services/CurrencyConversionService';

export class DisplayAdapter {
  constructor(private insertCoin: InsertCoinInterface) {}

  getDisplay(): string {
    const amountInCents = this.insertCoin.getCurrentAmount();
    if (amountInCents === 0) {
      return 'INSERT COIN';
    }
    const amountInDollars =
      CurrencyConversionService.centsToDollars(amountInCents);
    return `$${amountInDollars}`;
  }
}
