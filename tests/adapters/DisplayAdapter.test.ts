import {DisplayAdapter} from '../../src/adapters/DisplayAdapter';
import {VendingMachineService} from '../../src/domain/services/VendingMachineService';

describe('DisplayAdapter', () => {
  let vendingMachineService: VendingMachineService;
  let displayAdapter: DisplayAdapter;

  beforeEach(() => {
    vendingMachineService = new VendingMachineService();
    displayAdapter = new DisplayAdapter(vendingMachineService);
  });

  test('should display INSERT COIN initially', () => {
    const message = displayAdapter.getDisplay();
    expect(message).toBe('INSERT COIN');
  });

  test('should display amount after inserting a nickel', () => {
    vendingMachineService.insertCoin('NICKEL');
    const message = displayAdapter.getDisplay();
    expect(message).toBe('$0.05');
  });

  test('should display THANK YOU when product is selected with enough money', () => {
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.selectProduct('COLA');
    const message = displayAdapter.getDisplay();
    expect(message).toBe('THANK YOU');
  });

  test('should display PRICE when product is selected without enough money', () => {
    vendingMachineService.insertCoin('DIME');
    vendingMachineService.selectProduct('COLA');
    const message = displayAdapter.getDisplay();
    expect(message).toBe('PRICE $1.00');
  });

  test('should display INSERT COIN after reset when no money is inserted', () => {
    displayAdapter.resetDisplay();
    const message = displayAdapter.getDisplay();
    expect(message).toBe('INSERT COIN');
  });

  test('should display amount after reset when money is inserted', () => {
    vendingMachineService.insertCoin('QUARTER');
    displayAdapter.resetDisplay();
    const message = displayAdapter.getDisplay();
    expect(message).toBe('$0.25');
  });
});
