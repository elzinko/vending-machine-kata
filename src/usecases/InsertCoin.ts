import {CoinType} from '../domain/models/Coin';
import {VendingMachineService} from '../domain/services/VendingMachineService';
import {InsertCoinInterface} from '../interfaces/InsertCoinInterface';

export class InsertCoin implements InsertCoinInterface {
  constructor(private vendingMachineService: VendingMachineService) {}

  execute(coin: CoinType): void {
    this.vendingMachineService.insertCoin(coin);
  }

  getCurrentAmount(): number {
    return this.vendingMachineService.getCurrentAmount();
  }
  getCoinReturn(): CoinType[] {
    return this.vendingMachineService.getCoinReturn();
  }
}
