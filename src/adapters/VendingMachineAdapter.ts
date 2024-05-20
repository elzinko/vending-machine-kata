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
    this.insertCoin.execute(coin);
    return this.getDisplayMessage();
  }

  selectProductAndGetDisplay(product: ProductType): string {
    this.selectProduct.execute(product);
    return this.getDisplayMessage();
  }

  getDisplayMessage(): string {
    return this.selectProduct.getDisplayMessage();
  }

  resetDisplay(): void {
    this.selectProduct.resetDisplay();
  }
}
