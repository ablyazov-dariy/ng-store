import { FormControl, FormGroup } from '@angular/forms';

export type ProductForm = FormGroup<{
  new: FormControl<boolean | null>;
  imgUrl: FormControl<string | null>;
  price: FormControl<number | null>;
  discount: FormControl<number | null>;
  featured: FormControl<boolean | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  discountUntil: FormControl<string | null>;
  colors: FormControl<string | null>;
  sizes: FormControl<string | null>;
}>;
