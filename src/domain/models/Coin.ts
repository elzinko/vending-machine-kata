export const Coin = {
  NICKEL: {weight: 5, size: 21.21},
  DIME: {weight: 2.268, size: 17.91},
  QUARTER: {weight: 5.67, size: 24.26},
  PENNY: {weight: 2.5, size: 19.05},
} as const;

export type CoinType = keyof typeof Coin;

export const CoinValue = {
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  PENNY: 1,
} as const;
