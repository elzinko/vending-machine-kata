import {DisplayState} from '../models/DisplayState';

export class DisplayStateMachine {
  private state: DisplayState = 'INSERT_COIN';

  setState(newState: DisplayState): void {
    this.state = newState;
  }

  getState(): DisplayState {
    return this.state;
  }

  getMessage(currentBalance: number, price?: number): string {
    switch (this.state) {
      case 'INSERT_COIN':
        return 'INSERT COIN';
      case 'DISPLAY_AMOUNT':
        return `$${(currentBalance / 100).toFixed(2)}`;
      case 'THANK_YOU':
        return 'THANK YOU';
      case 'PRICE':
        return `PRICE $${(price! / 100).toFixed(2)}`;
      default:
        return 'INSERT COIN';
    }
  }
}
