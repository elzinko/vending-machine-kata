import {Request, Response} from 'express';
import {VendingMachineAdapter} from '../VendingMachineAdapter';
import {CoinType} from '../../domain/models/Coin';
import {ProductType} from '../../domain/models/Product';

export class VendingMachineController {
  constructor(private vendingMachineAdapter: VendingMachineAdapter) {}

  insertCoin(req: Request, res: Response): void {
    const {coin} = req.body;
    const displayMessage = this.vendingMachineAdapter.insertCoinAndGetDisplay(
      coin as CoinType
    );
    res.send({display: displayMessage});
  }

  selectProduct(req: Request, res: Response): void {
    const {name} = req.body;
    const displayMessage =
      this.vendingMachineAdapter.selectProductAndGetDisplay(
        name as ProductType
      );
    res.send({
      display: displayMessage,
    });
  }
}
