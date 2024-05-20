import {CoinType} from '../domain/models/Coin';
import {ProductType} from '../domain/models/Product';

export interface VendingMachineInterface {
  insertCoin(coin: CoinType): void;
  selectProduct(product: ProductType): void;
  getDisplayMessage(): string;
  resetDisplay(): void;
  getCurrentBalance(): number;
  getCoinReturn(): CoinType[];
  reset(): void;
}
