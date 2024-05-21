import {ProductType} from '../domain/models/Product';
import {VendingMachineService} from '../domain/services/VendingMachineService';
import {SelectProductInterface} from '../interfaces/SelectProductInterface';

export class SelectProduct implements SelectProductInterface {
  constructor(private vendingMachineService: VendingMachineService) {}

  execute(product: ProductType): string {
    return this.vendingMachineService.selectProduct(product);
  }
}
