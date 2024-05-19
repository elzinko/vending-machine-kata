import {VendingMachineService} from '../../src/domain/services/VendingMachineService';
import {InsertCoin} from '../../src/usecases/InsertCoin';
import {DisplayAdapter} from '../../src/adapters/DisplayAdapter';

describe('DisplayAdapter', () => {
  let vendingMachine: VendingMachineService;
  let insertCoin: InsertCoin;
  let displayAdapter: DisplayAdapter;

  beforeEach(() => {
    vendingMachine = new VendingMachineService();
    insertCoin = new InsertCoin(vendingMachine);
    displayAdapter = new DisplayAdapter(insertCoin);
  });

  test('should display INSERT COIN when no money is inserted', () => {
    expect(displayAdapter.getDisplay()).toBe('INSERT COIN');
  });

  test('should display the current amount when money is inserted', () => {
    insertCoin.execute('QUARTER');
    expect(displayAdapter.getDisplay()).toBe('$0.25');
  });
});
