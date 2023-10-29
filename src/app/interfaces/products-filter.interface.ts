import { SortDirection } from '@angular/material/sort';

export interface ProductsFilterInterface {
  id: number;
  searchQuery: string;
  newOnly: boolean;
  sortDirection: SortDirection;
  startWith: number;
  limit: number;
  favorite: boolean;
}
