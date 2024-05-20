import {VendingMachineInterface} from '../interfaces/VendingMachineInterface';

export class DisplayAdapter {
  constructor(private vendingMachineService: VendingMachineInterface) {}

  getDisplay(): string {
    return this.vendingMachineService.getDisplayMessage();
  }

  resetDisplay(): void {
    this.vendingMachineService.resetDisplay();
  }
}
