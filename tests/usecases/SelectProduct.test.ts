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
    const result = selectProduct.execute('COLA');
    expect(result).toBe('THANK YOU. Coin return : $0.00');
  });

  test('should display PRICE when not enough money is inserted for COLA', () => {
    vendingMachineService.insertCoin('DIME');
    const result = selectProduct.execute('COLA');
    expect(result).toBe('PRICE $1.00');
  });

  test('should display THANK YOU when enough money is inserted for CHIPS', () => {
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    const result = selectProduct.execute('CHIPS');
    expect(result).toBe('THANK YOU. Coin return : $0.00');
  });

  test('should display PRICE when not enough money is inserted for CHIPS', () => {
    vendingMachineService.insertCoin('NICKEL');
    const result = selectProduct.execute('CHIPS');
    expect(result).toBe('PRICE $0.50');
  });

  test('should display THANK YOU when enough money is inserted for CANDY', () => {
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('DIME');
    vendingMachineService.insertCoin('NICKEL');
    const result = selectProduct.execute('CANDY');
    expect(result).toBe('THANK YOU. Coin return : $0.00');
  });

  test('should display PRICE when not enough money is inserted for CANDY', () => {
    vendingMachineService.insertCoin('DIME');
    const result = selectProduct.execute('CANDY');
    expect(result).toBe('PRICE $0.65');
  });

  test('should add coin return info to the display message when too much money is inserted', () => {
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('QUARTER');
    vendingMachineService.insertCoin('DIME');
    vendingMachineService.insertCoin('DIME');
    vendingMachineService.insertCoin('DIME');
    vendingMachineService.insertCoin('NICKEL');
    vendingMachineService.insertCoin('NICKEL');
    const result = selectProduct.execute('CANDY');
    expect(result).toBe('THANK YOU. Coin return : $0.25 (QUARTER)');
  });
});
