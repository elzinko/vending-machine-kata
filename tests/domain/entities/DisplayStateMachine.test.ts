import {
  DISPLAY_AMOUNT_STATE,
  DisplayStateMachine,
  INSERT_COIN_STATE,
  PRICE_STATE,
  THANK_YOU_STATE,
} from '../../../src/domain/entities/DisplayStateMachine';
import {CoinType} from '../../../src/domain/models/Coin';

describe('DisplayStateMachine', () => {
  test('should return an empty string when the state is not PRICE', () => {
    const coins: CoinType[] = ['QUARTER', 'DIME', 'NICKEL'];
    const displayStateMachine = new DisplayStateMachine();
    const result = displayStateMachine.getCurrentCoinReturnMessage(coins);
    expect(result).toBe('');
  });

  test('should return the correct coin return message when the state is PRICE', () => {
    const coins: CoinType[] = ['QUARTER', 'DIME', 'NICKEL'];
    const displayStateMachine = new DisplayStateMachine();
    displayStateMachine.setState('PRICE');
    const result = displayStateMachine.getCurrentCoinReturnMessage(coins);
    const expected = 'RETURN COIN $0.40';
    expect(result).toBe(expected);
  });
  test('should return an empty string when the state is not PRICE', () => {
    const displayStateMachine = new DisplayStateMachine();
    const coins: CoinType[] = ['QUARTER', 'DIME', 'NICKEL'];
    const result = displayStateMachine.getCurrentCoinReturnMessage(coins);
    expect(result).toBe('');
  });

  test('should return the correct coin return message when the state is PRICE', () => {
    const displayStateMachine = new DisplayStateMachine();
    displayStateMachine.setState(PRICE_STATE);
    const coins: CoinType[] = ['QUARTER', 'DIME', 'NICKEL'];
    const result = displayStateMachine.getCurrentCoinReturnMessage(coins);
    const expected = 'RETURN COIN $0.40';
    expect(result).toBe(expected);
  });

  test('should return "INSERT COIN" when the state is INSERT_COIN', () => {
    const displayStateMachine = new DisplayStateMachine();
    displayStateMachine.setState(INSERT_COIN_STATE);
    const currentBalance = 0;
    const result = displayStateMachine.getMessage(currentBalance);
    expect(result).toBe('INSERT COIN');
  });

  test('should return the current balance in dollars when the state is DISPLAY_AMOUNT', () => {
    const displayStateMachine = new DisplayStateMachine();
    displayStateMachine.setState(DISPLAY_AMOUNT_STATE);
    const currentBalance = 500; // $5.00
    const result = displayStateMachine.getMessage(currentBalance);
    expect(result).toBe('BALANCE $5.00');
  });

  test('should return "THANK YOU" when the state is THANK_YOU', () => {
    const displayStateMachine = new DisplayStateMachine();
    displayStateMachine.setState(THANK_YOU_STATE);
    const currentBalance = 0;
    const result = displayStateMachine.getMessage(currentBalance);
    expect(result).toBe('THANK YOU');
  });

  test('should return the price of the product in dollars when the state is PRICE', () => {
    const displayStateMachine = new DisplayStateMachine();
    displayStateMachine.setState(PRICE_STATE);
    const currentBalance = 0;
    const price = 200; // $2.00
    const result = displayStateMachine.getMessage(currentBalance, price);
    expect(result).toBe('PRICE $2.00');
  });

  test('should return "INSERT COIN" by default', () => {
    const displayStateMachine = new DisplayStateMachine();
    const currentBalance = 0;
    const result = displayStateMachine.getMessage(currentBalance);
    expect(result).toBe('INSERT COIN');
  });
});
