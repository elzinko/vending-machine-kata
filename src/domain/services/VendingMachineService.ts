import {CoinType, CoinValues} from '../models/Coin';

export class VendingMachineService {
  private currentAmount = 0;
  private coinReturn: CoinType[] = [];

  insertCoin(coin: keyof typeof CoinValues): void {
    if (coin in CoinValues) {
      this.currentAmount += CoinValues[coin];
    } else {
      this.coinReturn.push(coin);
    }
  }

  getCurrentAmount(): number {
    return this.currentAmount;
  }

  getCoinReturn(): CoinType[] {
    throw new Error('Method not implemented.');
  }
}
