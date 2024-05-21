import {CoinType} from '../models/Coin';
import {VendingMachineState} from '../models/VendingMachineState';
import {ChangeService} from '../services/ChangeService';

export const IDLE_STATE = 'IDLE' as VendingMachineState;
export const INSERT_COIN_STATE = 'INSERT_COIN' as VendingMachineState;
export const DISPLAY_BALANCE_STATE = 'DISPLAY_AMOUNT' as VendingMachineState;
export const SELECT_PRODUCT_STATE = 'SELECT_PRODUCT' as VendingMachineState;
export const SHOW_PRICE_STATE = 'SHOW_PRICE' as VendingMachineState;

export class DisplayStateMachine {
  private state: VendingMachineState =
    IDLE_STATE.toString() as VendingMachineState;

  setState(newState: VendingMachineState): void {
    this.state = newState;
  }

  getState(): VendingMachineState {
    return this.state;
  }

  /**
   * Get message to display on the vending machine given current balance and the price of a product.
   * These are business rules :
   * - If the current state is INSERT_COIN, the message should be 'INSERT COIN'.
   * - If the current state is DISPLAY_AMOUNT, the message should be the current balance in dollars.
   * - If the current state is THANK_YOU, the message should be 'THANK YOU'.
   * - If the current state is PRICE, the message should be 'PRICE' followed by the price of the product in dollars.
   * @param currentBalance the current balance in cents
   * @param price the price of the product in cents
   * @returns the message to display on the vending machine
   */
  getMessage(
    currentBalance: number,
    coinReturn: CoinType[],
    productPrice?: number
  ): string {
    switch (this.state) {
      case INSERT_COIN_STATE:
        return 'INSERT COIN';
      case DISPLAY_BALANCE_STATE:
        return `BALANCE $${(currentBalance / 100).toFixed(2)}`;
      case SELECT_PRODUCT_STATE: {
        const returnedCoinsMessage = this.getCoinsAmountString(
          coinReturn || []
        );
        const coinReturnMessage =
          coinReturn.length > 0 ? ' (' + coinReturn.join(',') + ')' : '';
        return `THANK YOU. Coin return : $${returnedCoinsMessage}${coinReturnMessage}`;
      }
      case SHOW_PRICE_STATE: {
        const formatedAmount = (productPrice! / 100).toFixed(2);
        return `PRICE $${formatedAmount}`;
      }
      default:
        return 'INSERT COIN';
    }
  }

  getCoinsAmountString(coins: CoinType[]): string {
    return `${(ChangeService.computeCoinsAmount(coins) / 100).toFixed(2)}`;
  }
}
