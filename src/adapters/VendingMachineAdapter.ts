import {InsertCoinInterface} from '../interfaces/InsertCoinInterface';
import {SelectProductInterface} from '../interfaces/SelectProductInterface';
import {CoinType} from '../domain/models/Coin';
import {ProductType} from '../domain/models/Product';

export class VendingMachineAdapter {
  constructor(
    private insertCoin: InsertCoinInterface,
    private selectProduct: SelectProductInterface
  ) {}

  insertCoinAndGetDisplay(coin: CoinType): string {
    return this.insertCoin.execute(coin);
  }

  selectProductAndGetDisplay(product: ProductType): string {
    return this.selectProduct.execute(product);
  }
}
