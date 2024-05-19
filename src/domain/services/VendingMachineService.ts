import {AllowedCoins, CoinType, CoinValues} from '../models/Coin';

export class VendingMachineService {
  private currentAmount = 0;
  private coinReturn: CoinType[] = [];

  insertCoin(coin: CoinType): void {
    if (!Object.keys(CoinValues).includes(coin)) {
      this.coinReturn.push(coin);
    } else {
      this.currentAmount += CoinValues[coin as AllowedCoins];
    }
  }

  getCurrentAmount(): number {
    return this.currentAmount;
  }

  getCoinReturn(): CoinType[] {
    return this.coinReturn;
  }
}
