import {VendingMachineService} from '../domain/services/VendingMachineService';
import {InsertCoin} from '../usecases/InsertCoin';
import {VendingMachineAdapter} from '../adapters/VendingMachineAdapter';
import * as readlineSync from 'readline-sync';
import {SelectProduct} from '../usecases/SelectProduct';

const vendingMachineService = new VendingMachineService();
const insertCoinUseCase = new InsertCoin(vendingMachineService);
const selectProductUseCase = new SelectProduct(vendingMachineService);
const vendingMachineAdapter = new VendingMachineAdapter(
  insertCoinUseCase,
  selectProductUseCase
);

function showMenu() {
  console.log('\nAvailable actions :');
  console.log('1. Insert Penny (1 cent)');
  console.log('2. Insert Nickel (5 cents)');
  console.log('3. Insert Dime (10 cents)');
  console.log('4. Insert Quarter (25 cents)');
  console.log('5. Select Cola ($1.00)');
  console.log('6. Select Chips ($0.50)');
  console.log('7. Select Candy ($0.65)');
  console.log('0. Exit\n');
}

function handleUserInput(choice: number) {
  let display;
  switch (choice) {
    case 1:
      display = vendingMachineAdapter.insertCoinAndGetDisplay('PENNY');
      console.log('Penny inserted.');
      break;
    case 2:
      display = vendingMachineAdapter.insertCoinAndGetDisplay('NICKEL');
      console.log('Nickel inserted.');
      break;
    case 3:
      display = vendingMachineAdapter.insertCoinAndGetDisplay('DIME');
      console.log('Dime inserted.');
      break;
    case 4:
      display = vendingMachineAdapter.insertCoinAndGetDisplay('QUARTER');
      console.log('Quarter inserted.');
      break;
    case 5:
      display = vendingMachineAdapter.selectProductAndGetDisplay('COLA');
      console.log('Cola selected.');
      break;
    case 6:
      display = vendingMachineAdapter.selectProductAndGetDisplay('CHIPS');
      console.log('Chips selected.');
      break;
    case 7:
      display = vendingMachineAdapter.selectProductAndGetDisplay('CANDY');
      console.log('Candy selected.');
      break;
    case 0:
      console.log('Goodbye!');
      running = false;
      break;
    default:
      console.log('Invalid choice. Please try again.');
      return;
  }

  console.log(display);
}

let running = true;
console.log('Vending Machine\n');

while (running) {
  showMenu();
  const choice = readlineSync.questionInt('Choose an action: ');
  handleUserInput(choice);
}

console.log('Program terminated.');
