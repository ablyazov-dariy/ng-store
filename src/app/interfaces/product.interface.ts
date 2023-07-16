import { ReviewInterface } from '@interfaces/review.interface';

export interface ProductInterface {
  id: number;
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
  size: Size[];
  reviews: ReviewInterface[];
}

type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
// isArrayOfProductInterface
