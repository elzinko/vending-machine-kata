import {CoinType, CoinValues} from '../models/Coin';

export class VendingMachineService {
  private currentAmount = 0;

  insertCoin(coin: CoinType): void {
    if (coin in CoinValues) {
      this.currentAmount += CoinValues[coin];
    }
  }

  getCurrentAmount(): number {
    return this.currentAmount;
  }
}
