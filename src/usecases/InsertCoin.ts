import {CoinType} from '../domain/models/Coin';
import {VendingMachineService} from '../domain/services/VendingMachineService';
import {InsertCoinInterface} from '../interfaces/InsertCoinInterface';

export class InsertCoin implements InsertCoinInterface {
  constructor(private vendingMachineService: VendingMachineService) {}

  execute(coin: CoinType): string {
    return this.vendingMachineService.insertCoin(coin);
  }

  getCurrentBalance(): number {
    return this.vendingMachineService.getCurrentBalance();
  }

  getCoinReturn(): CoinType[] {
    return this.vendingMachineService.getCoinReturn();
  }
}
