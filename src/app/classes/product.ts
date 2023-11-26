import { ProductInterface, Size } from '@interfaces/product.interface';

export class Product implements ProductInterface {
  constructor(
    public id: string,
    public name: string,
    public imgUrl: string,
    public description: string,
    public price: number,
    public colors: string[],
    public sizes: Size[],
    public featured?: boolean,
    public discount?: number,
    public discountUntil?: string
  ) {}
}
