import {SelectProduct} from '../../src/usecases/SelectProduct';
import {VendingMachineService} from '../../src/domain/services/VendingMachineService';

describe('SelectProduct', () => {
  let vendingMachineService: VendingMachineService;
  let selectProduct: SelectProduct;

  beforeEach(() => {
    vendingMachineService = new VendingMachineService();
    selectProduct = new SelectProduct(vendingMachineService);
  });

  test('should display THANK YOU when enough money is inserted for COLA', () => {
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    selectProduct.execute('COLA');
    expect(vendingMachineService.getDisplayMessage()).toBe('THANK YOU');
  });

  test('should display PRICE when not enough money is inserted for COLA', () => {
    vendingMachineService.insertCoin('DIME');
    selectProduct.execute('COLA');
    expect(vendingMachineService.getDisplayMessage()).toBe('PRICE $1.00');
  });

  test('should display THANK YOU when enough money is inserted for CHIPS', () => {
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    selectProduct.execute('CHIPS');
    expect(vendingMachineService.getDisplayMessage()).toBe('THANK YOU');
  });

  test('should display PRICE when not enough money is inserted for CHIPS', () => {
    vendingMachineService.insertCoin('NICKEL');
    selectProduct.execute('CHIPS');
    expect(vendingMachineService.getDisplayMessage()).toBe('PRICE $0.50');
  });

  test('should display THANK YOU when enough money is inserted for CANDY', () => {
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('DIME');
    vendingMachineService.insertCoin('NICKEL');
    selectProduct.execute('CANDY');
    expect(vendingMachineService.getDisplayMessage()).toBe('THANK YOU');
  });

  test('should display PRICE when not enough money is inserted for CANDY', () => {
    vendingMachineService.insertCoin('DIME');
    selectProduct.execute('CANDY');
    expect(vendingMachineService.getDisplayMessage()).toBe('PRICE $0.65');
  });
});
