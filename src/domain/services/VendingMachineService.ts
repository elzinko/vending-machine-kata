import {VendingMachineInterface} from '../../interfaces/VendingMachineInterface';
import {
  DISPLAY_BALANCE_STATE,
  DisplayStateMachine,
  INSERT_COIN_STATE,
  SHOW_PRICE_STATE,
  SELECT_PRODUCT_STATE,
  IDLE_STATE,
} from '../entities/DisplayStateMachine';
import {
  AllowedCoins,
  CoinType,
  CoinValues,
  allowedCoinsTypes,
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

  insertCoin(coin: CoinType): string {
    {
      if (coin in CoinValues) {
        this.balance += CoinValues[coin as AllowedCoins];
        this.displayStateMachine.setState(DISPLAY_BALANCE_STATE);
      } else {
        this.coinReturn.push(coin);
        this.displayStateMachine.setState(IDLE_STATE);
      }
      return this.getDisplayMessage();
    }
  }

  selectProduct(product: ProductType): string {
    this.selectedProduct = product;
    if (this.balance >= ProductPrices[product]) {
      this.balance -= ProductPrices[product];
      this.coinReturn = ChangeService.makeChange(
        this.balance,
        allowedCoinsTypes
      );
      this.balance = 0;
      this.displayStateMachine.setState(SELECT_PRODUCT_STATE);
    } else {
      this.displayStateMachine.setState(SHOW_PRICE_STATE);
    }
    return this.getDisplayMessage();
  }

  getDisplayMessage(): string {
    const selectedProductPrice = this.getSelectedProductPrice()
      ? this.getSelectedProductPrice()
      : undefined;
    return this.displayStateMachine.getMessage(
      this.balance,
      this.coinReturn,
      selectedProductPrice
    );
  }

  resetDisplay(): void {
    if (this.balance > 0) {
      this.displayStateMachine.setState(DISPLAY_BALANCE_STATE);
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
