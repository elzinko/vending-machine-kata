import {InsertCoin} from '../../src/usecases/InsertCoin';
import {VendingMachineService} from '../../src/domain/services/VendingMachineService';

describe('InsertCoin', () => {
  let vendingMachineService: VendingMachineService;
  let insertCoin: InsertCoin;

  beforeEach(() => {
    vendingMachineService = new VendingMachineService();
    insertCoin = new InsertCoin(vendingMachineService);
  });

  test('should add nickel to the vending machine and update balance', () => {
    insertCoin.execute('NICKEL');
    expect(insertCoin.getCurrentBalance()).toBe(5);
  });

  test('should add dime to the vending machine and update balance', () => {
    insertCoin.execute('DIME');
    expect(insertCoin.getCurrentBalance()).toBe(10);
  });

  test('should add quarter to the vending machine and update balance', () => {
    insertCoin.execute('QUARTER');
    expect(insertCoin.getCurrentBalance()).toBe(25);
  });

  test('should add invalid coin to coin return', () => {
    insertCoin.execute('PENNY');
    expect(insertCoin.getCoinReturn()).toContain('PENNY');
  });

  test('should not add invalid coin to the current balance', () => {
    insertCoin.execute('PENNY');
    expect(insertCoin.getCurrentBalance()).toBe(0);
  });
});
