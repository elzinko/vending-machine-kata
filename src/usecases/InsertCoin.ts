import {CoinType} from '../domain/models/Coin';
import {VendingMachineService} from '../domain/services/VendingMachineService';

export class InsertCoin {
  constructor(private vendingMachineService: VendingMachineService) {}

  execute(coin: CoinType): void {
    this.vendingMachineService.insertCoin(coin);
  }
}
