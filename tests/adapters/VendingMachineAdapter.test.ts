import {VendingMachineAdapter} from '../../src/adapters/VendingMachineAdapter';
import {InsertCoin} from '../../src/usecases/InsertCoin';
import {SelectProduct} from '../../src/usecases/SelectProduct';
import {VendingMachineService} from '../../src/domain/services/VendingMachineService';

describe('VendingMachineAdapter', () => {
  let vendingMachineService: VendingMachineService;
  let insertCoinUseCase: InsertCoin;
  let selectProductUseCase: SelectProduct;
  let vendingMachineAdapter: VendingMachineAdapter;

  beforeEach(() => {
    vendingMachineService = new VendingMachineService();
    insertCoinUseCase = new InsertCoin(vendingMachineService);
    selectProductUseCase = new SelectProduct(vendingMachineService);
    vendingMachineAdapter = new VendingMachineAdapter(
      insertCoinUseCase,
      selectProductUseCase
    );
  });

  test('should display amount after inserting a nickel', () => {
    const message = vendingMachineAdapter.insertCoinAndGetDisplay('NICKEL');
    expect(message).toBe('BALANCE $0.05');
  });

  test('should display amount after inserting a dime', () => {
    const message = vendingMachineAdapter.insertCoinAndGetDisplay('DIME');
    expect(message).toBe('BALANCE $0.10');
  });

  test('should display amount after inserting a quarter', () => {
    const message = vendingMachineAdapter.insertCoinAndGetDisplay('QUARTER');
    expect(message).toBe('BALANCE $0.25');
  });

  test('should display PRICE when not enough money is inserted for COLA', () => {
    vendingMachineAdapter.insertCoinAndGetDisplay('DIME');
    const message = vendingMachineAdapter.selectProductAndGetDisplay('COLA');
    expect(message).toBe('PRICE $1.00');
  });

  test('should display THANK YOU when enough money is inserted for COLA', () => {
    vendingMachineAdapter.insertCoinAndGetDisplay('QUARTER');
    vendingMachineAdapter.insertCoinAndGetDisplay('QUARTER');
    vendingMachineAdapter.insertCoinAndGetDisplay('QUARTER');
    vendingMachineAdapter.insertCoinAndGetDisplay('QUARTER');
    const message = vendingMachineAdapter.selectProductAndGetDisplay('COLA');
    expect(message).toBe('THANK YOU');
  });

  test('should display amount after resetting display', () => {
    vendingMachineAdapter.insertCoinAndGetDisplay('QUARTER');
    vendingMachineAdapter.resetDisplay();
    const message = vendingMachineAdapter.getDisplayMessage();
    expect(message).toBe('BALANCE $0.25');
  });
});
