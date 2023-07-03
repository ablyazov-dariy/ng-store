import { Component, computed, inject } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { FilterStateService } from '@services/filter-state.service';

@Component({
  selector: 'app-view-controller',
  templateUrl: './view-controller.component.html',
  styleUrls: ['./view-controller.component.scss'],
})
export class ViewControllerComponent {
  private filterService: FilterStateService = inject(FilterStateService);

  sortLabel = computed((): 'low to high' | 'high to low' => {
    if (this.filterService.sortDirection() === 'asc') {
      return 'low to high';
    } else if (this.filterService.sortDirection() === 'desc') {
      return 'high to low';
    } else {
      throw new Error('Invalid sort direction, try set disableClear to true');
    }
  });

  sortData(sort: Sort): void {
    this.filterService.sortDirection.set(sort.direction);
  }
}
