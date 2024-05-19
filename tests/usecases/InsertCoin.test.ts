import {CoinValues} from '../../src/domain/models/Coin';
import {VendingMachineService} from '../../src/domain/services/VendingMachineService';
import {InsertCoin} from '../../src/usecases/InsertCoin';

describe('InsertCoin', () => {
  let vendingMachineService: VendingMachineService;
  let insertCoin: InsertCoin;

  beforeEach(() => {
    vendingMachineService = new VendingMachineService();
    insertCoin = new InsertCoin(vendingMachineService);
  });

  it('should insert a coin', () => {
    insertCoin.execute('DIME');
    expect(vendingMachineService.getCurrentAmount()).toEqual(CoinValues.DIME);
    expect(vendingMachineService.getCoinReturn()).toEqual([]);
  });

  it('should return the coin return', () => {
    vendingMachineService.insertCoin('NICKEL');
    expect(vendingMachineService.getCurrentAmount()).toEqual(CoinValues.NICKEL);
    expect(vendingMachineService.getCoinReturn()).toEqual([]);

    vendingMachineService.insertCoin('DIME');
    expect(vendingMachineService.getCurrentAmount()).toEqual(
      CoinValues.NICKEL + CoinValues.DIME
    );
    expect(vendingMachineService.getCoinReturn()).toEqual([]);

    vendingMachineService.insertCoin('QUARTER');
    expect(vendingMachineService.getCurrentAmount()).toEqual(
      CoinValues.NICKEL + CoinValues.DIME + CoinValues.QUARTER
    );
    expect(vendingMachineService.getCoinReturn()).toEqual([]);

    vendingMachineService.insertCoin('PENNY');
    expect(vendingMachineService.getCurrentAmount()).toEqual(
      CoinValues.NICKEL + CoinValues.DIME + CoinValues.QUARTER
    );
    expect(vendingMachineService.getCoinReturn()).toEqual(['PENNY']);
  });
});
