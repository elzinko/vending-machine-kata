import {VendingMachineInterface} from '../../interfaces/VendingMachineInterface';
import {
  DISPLAY_AMOUNT_STATE,
  DisplayStateMachine,
  INSERT_COIN_STATE,
  PRICE_STATE,
  THANK_YOU_STATE,
} from '../entities/DisplayStateMachine';
import {
  AllowedCoins,
  CoinType,
  CoinValues,
  allowedCoinsTypes as ALLOWED_COIN_TYPES,
} from '../models/Coin';
import {ProductPrices, ProductType} from '../models/Product';
import {ChangeService} from './ChangeService';

export const INSERT_COIN_MESSAGE = 'INSERT COIN';
export const THANK_YOU_MESSAGE = 'THANK YOU';

export class VendingMachineService implements VendingMachineInterface {
  private balance = 0;
  private coinReturn: CoinType[] = [];
  private displayStateMachine: DisplayStateMachine = new DisplayStateMachine();
  private selectedProduct?: ProductType;

  insertCoin(coin: CoinType): void {
    if (coin in CoinValues) {
      this.balance += CoinValues[coin as AllowedCoins];
      this.displayStateMachine.setState(DISPLAY_AMOUNT_STATE);
    } else {
      this.coinReturn.push(coin);
    }
  }

  selectProduct(product: ProductType): void {
    this.selectedProduct = product;
    if (this.balance >= ProductPrices[product]) {
      this.balance -= ProductPrices[product];
      this.coinReturn = ChangeService.makeChange(
        this.balance,
        ALLOWED_COIN_TYPES
      );
      this.balance = 0;
      this.displayStateMachine.setState(THANK_YOU_STATE);
    } else {
      this.displayStateMachine.setState(PRICE_STATE);
    }
  }

  getDisplayMessage(): string {
    const price =
      this.displayStateMachine.getState() === PRICE_STATE
        ? this.getSelectedProductPrice()
        : undefined;
    return this.displayStateMachine.getMessage(this.balance, price);
  }

  resetDisplay(): void {
    if (this.balance > 0) {
      this.displayStateMachine.setState(DISPLAY_AMOUNT_STATE);
    } else {
      this.displayStateMachine.setState(INSERT_COIN_STATE);
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

  private getSelectedProductPrice(): number | undefined {
    if (this.selectedProduct) {
      return ProductPrices[this.selectedProduct];
    }
    return undefined;
  }
}
