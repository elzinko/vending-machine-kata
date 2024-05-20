import {VendingMachineService} from '../domain/services/VendingMachineService';
import {InsertCoin} from '../usecases/InsertCoin';
import {VendingMachineAdapter} from '../adapters/VendingMachineAdapter';
import * as readlineSync from 'readline-sync';
import {SelectProduct} from '../usecases/SelectProduct';
import { DisplayStateMachine } from '../domain/entities/DisplayStateMachine';

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
  console.log('8. Check display');
  console.log('0. Exit\n');
}

function handleUserInput(choice: number) {
  let display;
  switch (choice) {
    case 1:
      display = vendingMachineAdapter.insertCoinAndGetDisplay('PENNY');
      console.log('Penny inserted.');
      console.log(display);
      break;
    case 2:
      display = vendingMachineAdapter.insertCoinAndGetDisplay('NICKEL');
      console.log('Nickel inserted.');
      console.log(display);
      break;
    case 3:
      display = vendingMachineAdapter.insertCoinAndGetDisplay('DIME');
      console.log('Dime inserted.');
      console.log(display);
      break;
    case 4:
      display = vendingMachineAdapter.insertCoinAndGetDisplay('QUARTER');
      console.log('Quarter inserted.');
      console.log(display);
      break;
    case 5:
      display = vendingMachineAdapter.selectProductAndGetDisplay('COLA');
      console.log('Cola selected.');
      console.log(display);
      break;
    case 6:
      display = vendingMachineAdapter.selectProductAndGetDisplay('CHIPS');
      console.log('Chips selected.');
      console.log(display);
      break;
    case 7:
      display = vendingMachineAdapter.selectProductAndGetDisplay('CANDY');
      console.log('Candy selected.');
      console.log(display);
      break;
    case 8:
      console.log(vendingMachineAdapter.getDisplayMessage());
      break;
    case 0:
      console.log('Goodbye!');
      running = false;
      break;
    default:
      console.log('Invalid choice. Please try again.');
      return;
  }
}

let running = true;
console.log('Vending Machine\n');

while (running) {
  showMenu();
  const choice = readlineSync.questionInt('Choose an action: ');
  handleUserInput(choice);
  vendingMachineAdapter.getDisplayMessage();
}

console.log('Program terminated.');
