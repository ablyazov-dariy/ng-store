import { ProductDetailsInterface } from '@interfaces/product-details.interface';

export class CreateProductDetailsClass implements ProductDetailsInterface {
  constructor(public id: number, public name: string, public color: string, public size: string) {}
}
