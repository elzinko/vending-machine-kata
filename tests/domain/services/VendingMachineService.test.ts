import {VendingMachineService} from '../../../src/domain/services/VendingMachineService';

describe('VendingMachineService', () => {
  let vendingMachine: VendingMachineService;

  beforeEach(() => {
    vendingMachine = new VendingMachineService();
  });

  test('should update current balance in cents when adding value', () => {
    vendingMachine.insertCoin('QUARTER');
    expect(vendingMachine.getCurrentBalance()).toBe(25);
  });

  test('should add coin to coin return', () => {
    vendingMachine.insertCoin('PENNY');
    expect(vendingMachine.getCoinReturn()).toContain('PENNY');
  });

  test('should reset current balance to zero', () => {
    vendingMachine.insertCoin('QUARTER');
    vendingMachine.reset();
    expect(vendingMachine.getCurrentBalance()).toBe(0);
  });

  test('should display THANK YOU when enough money is inserted and product is selected', () => {
    vendingMachine.insertCoin('QUARTER');
    vendingMachine.insertCoin('QUARTER');
    vendingMachine.selectProduct('CHIPS');
    expect(vendingMachine.getDisplayMessage()).toBe('THANK YOU');
    vendingMachine.resetDisplay();
    expect(vendingMachine.getDisplayMessage()).toBe('INSERT COIN');
  });

  test('should display PRICE when not enough money is inserted for a product', () => {
    vendingMachine.insertCoin('DIME');
    vendingMachine.selectProduct('COLA');
    expect(vendingMachine.getDisplayMessage()).toBe('PRICE $1.00');
  });
});
