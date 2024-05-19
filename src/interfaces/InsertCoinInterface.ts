import {CoinType} from '../domain/models/Coin';

export interface InsertCoinInterface {
  execute(coin: CoinType): void;
  getCurrentAmount(): number;
  getCoinReturn(): CoinType[];
}