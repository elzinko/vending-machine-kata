import {CoinType} from '../../../src/domain/models/Coin';
import {
  DisplayStateMachine,
  IDLE_STATE,
  INSERT_COIN_STATE,
  DISPLAY_BALANCE_STATE,
  SELECT_PRODUCT_STATE,
  SHOW_PRICE_STATE,
} from '../../../src/domain/entities/DisplayStateMachine';

describe('DisplayStateMachine', () => {
  let displayStateMachine: DisplayStateMachine;

  beforeEach(() => {
    displayStateMachine = new DisplayStateMachine();
  });

  it('should set the state correctly', () => {
    const newState = INSERT_COIN_STATE;
    displayStateMachine.setState(newState);
    expect(displayStateMachine.getState()).toBe(newState);
  });

  it('should return the correct message for INSERT_COIN_STATE', () => {
    displayStateMachine.setState(INSERT_COIN_STATE);
    expect(displayStateMachine.getMessage(0, [])).toBe('INSERT COIN');
  });

  it('should return the correct message for DISPLAY_BALANCE_STATE', () => {
    const currentBalance = 500;
    displayStateMachine.setState(DISPLAY_BALANCE_STATE);
    expect(displayStateMachine.getMessage(currentBalance, [])).toBe(
      'BALANCE $5.00'
    );
  });

  it('should return the correct message for SELECT_PRODUCT_STATE', () => {
    const coinReturn: CoinType[] = ['QUARTER', 'DIME'];
    displayStateMachine.setState(SELECT_PRODUCT_STATE);
    expect(displayStateMachine.getMessage(0, coinReturn)).toBe(
      'THANK YOU. Coin return : $0.35 (QUARTER,DIME)'
    );
  });

  it('should return the correct message for SHOW_PRICE_STATE', () => {
    const productPrice = 200;
    const anyBalanceAmount = 0;
    const anyCoinReturn: CoinType[] = [];
    displayStateMachine.setState(SHOW_PRICE_STATE);
    expect(
      displayStateMachine.getMessage(
        anyBalanceAmount,
        anyCoinReturn,
        productPrice
      )
    ).toBe('PRICE $2.00');
  });

  it('should return the default message for unknown state', () => {
    displayStateMachine.setState(IDLE_STATE);
    expect(displayStateMachine.getMessage(0, [])).toBe('INSERT COIN');
  });

  it('should return the correct coins amount string', () => {
    const coins: CoinType[] = ['QUARTER', 'DIME', 'NICKEL'];
    expect(displayStateMachine.getCoinsAmountString(coins)).toBe('0.40');
  });
});
