import { ProductInterface } from '@interfaces/product.interface';

export interface ProductWithCountInterface extends ProductInterface {
  __count: number;
}
