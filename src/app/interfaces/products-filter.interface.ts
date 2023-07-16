import { SortDirection } from '@angular/material/sort';

export interface ProductsFilterInterface {
  searchQuery: string;
  newOnly: boolean;
  sortDirection: SortDirection;
  startWith: number;
  limit: number;
}
