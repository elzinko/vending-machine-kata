import {VendingMachineInterface} from '../../interfaces/VendingMachineInterface';
import {DisplayStateMachine} from '../entities/DisplayStateMachine';
import {AllowedCoins, CoinType, CoinValues} from '../models/Coin';
import {ProductPrices, ProductType} from '../models/Product';

export const INSERT_COIN_MESSAGE = 'INSERT COIN';
export const THANK_YOU_MESSAGE = 'THANK YOU';

export class VendingMachineService implements VendingMachineInterface {
  private balance = 0;
  private coinReturn: CoinType[] = [];
  private selectedProduct?: ProductType;
  private displayStateMachine: DisplayStateMachine = new DisplayStateMachine();

  insertCoin(coin: CoinType): void {
    if (coin in CoinValues) {
      this.balance += CoinValues[coin as AllowedCoins];
      this.displayStateMachine.setState('DISPLAY_AMOUNT');
    } else {
      this.coinReturn.push(coin);
    }
  }

  selectProduct(product: ProductType): void {
    this.selectedProduct = product;
    if (this.balance >= ProductPrices[product]) {
      this.balance -= ProductPrices[product];
      this.displayStateMachine.setState('THANK_YOU');
    } else {
      this.displayStateMachine.setState('PRICE');
    }
  }

  getDisplayMessage(): string {
    const price =
      this.displayStateMachine.getState() === 'PRICE'
        ? this.getProductPrice()
        : undefined;
    return this.displayStateMachine.getMessage(this.balance, price);
  }

  resetDisplay(): void {
    if (this.balance > 0) {
      this.displayStateMachine.setState('DISPLAY_AMOUNT');
    } else {
      this.displayStateMachine.setState('INSERT_COIN');
    }
    this.selectedProduct = undefined;
  }

  getCurrentBalance(): number {
    return this.balance;
  }

  getCoinReturn(): CoinType[] {
    return this.coinReturn;
  }

  reset(): void {
    this.balance = 0;
    this.resetDisplay();
  }

  private getProductPrice(): number | undefined {
    if (this.selectedProduct) {
      return ProductPrices[this.selectedProduct];
    }
    return undefined;
  }
}
