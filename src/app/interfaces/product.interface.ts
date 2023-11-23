import { ReviewInterface } from '@interfaces/review.interface';

export interface ProductInterface {
  id: string;
  imgUrl: string;
  price: number;
  discount?: number;
  featured?: boolean;
  collection: string;
  name: string;
  description: string;
  discountUntil?: Date;
  new?: boolean;
  colors: string[];
  sizes: Size[];
  reviews?: ReviewInterface[];
  favorite?: boolean;
}

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
