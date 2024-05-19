import {CoinType} from '../models/Coin';

export class VendingMachineService {
  private currentAmount = 0;

  insertCoin(coin: CoinType): void {
    throw new Error(`insertCoin('${coin}') method not implemented.`);
  }

  getCurrentAmount(): number {
    throw new Error('Method not implemented.');
  }
}
