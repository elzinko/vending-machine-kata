import {CoinValue} from '../../../src/domain/models/Coin';
import {VendingMachineService} from '../../../src/domain/services/VendingMachineService';

describe('VendingMachineService', () => {
  const vendingMachine: VendingMachineService = new VendingMachineService();

  test('should insert a dime and update the current amount', () => {
    vendingMachine.insertCoin('DIME');
    expect(vendingMachine.getCurrentAmount()).toBe(CoinValue.DIME);
  });
});
