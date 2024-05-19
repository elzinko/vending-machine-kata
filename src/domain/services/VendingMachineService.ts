import {AllowedCoins, CoinType, CoinValues} from '../models/Coin';

export class VendingMachineService {
  private currentAmount = 0;
  private coinReturn: CoinType[] = [];

  insertCoin(coin: CoinType): void {
    if (coin in CoinValues) {
      this.currentAmount += CoinValues[coin as AllowedCoins];
    } else {
      this.coinReturn.push(coin);
    }
  }

  getCurrentAmount(): number {
    return this.currentAmount;
  }

  getCoinReturn(): CoinType[] {
    return this.coinReturn;
  }
}
