// eslint-disable-next-line node/no-unpublished-import
import {Given, When, Then} from '@cucumber/cucumber';
import assert from 'assert';
import {VendingMachineAdapter} from '../../src/adapters/VendingMachineAdapter';
import {InsertCoin} from '../../src/usecases/InsertCoin';
import {SelectProduct} from '../../src/usecases/SelectProduct';
import {VendingMachineService} from '../../src/domain/services/VendingMachineService';
import {CoinType} from '../../src/domain/models/Coin';

let vendingMachine: VendingMachineAdapter;
let vendingMachineService: VendingMachineService;
let display: string;
let coinString: String;

Given('the vending machine is powered on', () => {
  vendingMachineService = new VendingMachineService();
  const insertCoin = new InsertCoin(vendingMachineService);
  const selectProduct = new SelectProduct(vendingMachineService);
  vendingMachine = new VendingMachineAdapter(insertCoin, selectProduct);
});

When('an invalid coin {string} is inserted', (coin: string) => {
  coinString = coin;
  display = vendingMachine.insertCoinAndGetDisplay(coin as CoinType);
});

Then('the display should show {string}', (expectedDisplay: string) => {
  assert.strictEqual(display, expectedDisplay);
});

Then('the current balance should be {float}', (expectedBalance: number) => {
  assert.strictEqual(
    vendingMachineService.getCurrentBalance(),
    expectedBalance
  );
});

Then('the coin should be returned', () => {
  assert.equal(vendingMachineService.getCoinReturn(), coinString);
});
