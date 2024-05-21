import express from 'express';
import {VendingMachineService} from './domain/services/VendingMachineService';
import {VendingMachineController} from './adapters/controllers/VendingMachineController';
import {VendingMachineAdapter} from './adapters/VendingMachineAdapter';
import {InsertCoin} from './usecases/InsertCoin';
import {SelectProduct} from './usecases/SelectProduct';

const app = express();
app.use(express.json());

const vendingMachineService = new VendingMachineService();

const insertCoinUseCase = new InsertCoin(vendingMachineService);
const selectProductUseCase = new SelectProduct(vendingMachineService);
const vendingMachineAdapter = new VendingMachineAdapter(
  insertCoinUseCase,
  selectProductUseCase
);
const vendingMachineController = new VendingMachineController(
  vendingMachineAdapter
);

app.post('/api/insertCoin', (req, res) =>
  vendingMachineController.insertCoin(req, res)
);
app.post('/api/selectProduct', (req, res) =>
  vendingMachineController.selectProduct(req, res)
);

app.listen(3000, () => {
  console.log('Vending Machine API is running on port 3000');
});
