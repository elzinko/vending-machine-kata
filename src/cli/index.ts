import {VendingMachineService} from '../domain/services/VendingMachineService';
import {InsertCoin} from '../usecases/InsertCoin';
import {DisplayAdapter} from '../adapters/DisplayAdapter';
import * as readlineSync from 'readline-sync';

const vendingMachineService = new VendingMachineService();
const insertCoinUseCase = new InsertCoin(vendingMachineService);
const displayAdapter = new DisplayAdapter(insertCoinUseCase);

function showMenu() {
  console.log('\nAvailable actions :');
  console.log('1. Insert Penny (1 cent)');
  console.log('5. Insert Nickel (5 cents)');
  console.log('10. Insert Dime (10 cents)');
  console.log('25. Insert Quarter (25 cents)');
  console.log('0. Exit\n');
}

function handleUserInput(choice: number) {
  switch (choice) {
    case 1:
      insertCoinUseCase.execute('PENNY');
      console.log('Penny inserted.');
      break;
    case 5:
      insertCoinUseCase.execute('NICKEL');
      console.log('Nickel inserted.');
      break;
    case 10:
      insertCoinUseCase.execute('DIME');
      console.log('Dime inserted.');
      break;
    case 25:
      insertCoinUseCase.execute('QUARTER');
      console.log('Quarter inserted.');
      break;
    case 0:
      console.log('Goodbye!');
      running = false;
      // throw new Error('Program terminated.');
      break;
    default:
      console.log('Invalid choice. Please try again.');
  }
}

let running = true;

console.log('Vending Machine\n');

while (running) {
  console.log('Display: ' + displayAdapter.getDisplay());
  showMenu();
  const choice = readlineSync.questionInt('Choose an action: ');
  handleUserInput(choice);
}

console.log('Program terminated.');
