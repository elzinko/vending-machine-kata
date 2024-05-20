import {DisplayState} from '../models/DisplayState';

export const INSERT_COIN_STATE = 'INSERT_COIN' as DisplayState;
export const DISPLAY_AMOUNT_STATE = 'DISPLAY_AMOUNT' as DisplayState;
export const THANK_YOU_STATE = 'THANK_YOU' as DisplayState;
export const PRICE_STATE = 'PRICE' as DisplayState;

export class DisplayStateMachine {
  private state: DisplayState = INSERT_COIN_STATE.toString() as DisplayState;

  // TODO: should thinks about necessity to expose state setter. Maybe getMessage could get current state from current vending machine state instead
  setState(newState: DisplayState): void {
    this.state = newState;
  }

  getState(): DisplayState {
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
  getMessage(currentBalance: number, price?: number): string {
    switch (this.state) {
      case INSERT_COIN_STATE:
        return 'INSERT COIN';
      case DISPLAY_AMOUNT_STATE:
        return `$${(currentBalance / 100).toFixed(2)}`;
      case THANK_YOU_STATE:
        return 'THANK YOU';
      case PRICE_STATE:
      case 'PRICE':
        return `PRICE $${(price! / 100).toFixed(2)}`;
      default:
        return 'INSERT COIN';
    }
  }
}
