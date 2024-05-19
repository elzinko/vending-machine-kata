import {CoinValues} from '../../../../src/domain/models/Coin';
import {VendingMachineService} from '../../../../src/domain/services/VendingMachineService';
import {InsertCoin} from '../../../../src/usecases/InsertCoin';

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
  });
});
