import { FormControl, FormGroup } from '@angular/forms';

export type ProductForm = FormGroup<{
  id: FormControl;
  imgUrl: FormControl;
  price: FormControl;
  discount: FormControl;
  featured: FormControl;
  collection: FormControl;
  name: FormControl;
  description: FormControl;
  discountUntil: FormControl;
  new: FormControl;
  colors: FormControl;
  sizes: FormControl;
  reviews: FormControl;
  favorite: FormControl;
}>;
