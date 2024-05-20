import {ProductType} from '../domain/models/Product';

export interface SelectProductInterface {
  execute(product: ProductType): void;
  getDisplayMessage(): string;
  resetDisplay(): void;
}
