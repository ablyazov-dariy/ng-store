import { ReviewInterface } from '@interfaces/review.interface';

export interface ProductInterface {
  id: string;
  imgUrl: string;
  price: number;
  discount?: number;
  featured?: boolean;
  name: string;
  description: string;
  discountUntil?: string;
  new?: boolean;
  colors: string[];
  sizes: Size[];
  reviews?: ReviewInterface[];
  favorite?: boolean;
}

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
