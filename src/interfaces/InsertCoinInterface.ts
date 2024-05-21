import {CoinType} from '../domain/models/Coin';

export interface InsertCoinInterface {
  execute(coin: CoinType): string;
  getCurrentBalance(): number;
  getCoinReturn(): CoinType[];
}
