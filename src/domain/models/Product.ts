export type ProductType = 'COLA' | 'CHIPS' | 'CANDY';

export const ProductPrices: Record<ProductType, number> = {
  COLA: 100,
  CHIPS: 50,
  CANDY: 65,
} as const;
