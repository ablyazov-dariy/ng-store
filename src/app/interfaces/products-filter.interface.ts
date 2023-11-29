import { SortDirection } from '@angular/material/sort';

export interface ProductsFilterInterface {
  id: string;
  searchQuery: string;
  newOnly: boolean;
  sortDirection: SortDirection;
  startWith: number;
  limit: number;
  favorite: boolean;
  featured: boolean;
  noCash: boolean;
}
