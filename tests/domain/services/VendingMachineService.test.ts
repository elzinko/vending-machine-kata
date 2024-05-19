import {CoinValues} from '../../../src/domain/models/Coin';
import {VendingMachineService} from '../../../src/domain/services/VendingMachineService';
import {InsertCoin} from '../../../src/usecases/InsertCoin';

describe('InsertCoin', () => {
  let vendingMachine: VendingMachineService;
  let insertCoin: InsertCoin;

  beforeEach(() => {
    vendingMachine = new VendingMachineService();
    insertCoin = new InsertCoin(vendingMachine);
  });

  test('should insert a nickel and update the current amount', () => {
    insertCoin.execute('NICKEL');
    expect(vendingMachine.getCurrentAmount()).toBe(CoinValues.NICKEL);
    expect(vendingMachine.getCoinReturn()).toEqual([]);
  });

  test('should insert a dime and update the current amount', () => {
    insertCoin.execute('DIME');
    expect(vendingMachine.getCurrentAmount()).toBe(CoinValues.DIME);
    expect(vendingMachine.getCoinReturn()).toEqual([]);
  });

  test('should insert a quarter and update the current amount', () => {
    insertCoin.execute('QUARTER');
    expect(vendingMachine.getCurrentAmount()).toBe(CoinValues.QUARTER);
    expect(vendingMachine.getCoinReturn()).toEqual([]);
  });

  test('should insert a penny and return the coin', () => {
    insertCoin.execute('PENNY');
    expect(vendingMachine.getCoinReturn()).toEqual(['PENNY']);
  });

  test('should return the coin return', () => {
    vendingMachine.insertCoin('NICKEL');
    vendingMachine.insertCoin('DIME');
    vendingMachine.insertCoin('QUARTER');
    vendingMachine.insertCoin('PENNY');
    expect(vendingMachine.getCurrentAmount()).toBe(
      CoinValues.NICKEL + CoinValues.DIME + CoinValues.QUARTER
    );
    expect(vendingMachine.getCoinReturn()).toEqual(['PENNY']);
  });
});
