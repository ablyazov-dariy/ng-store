import { Component, signal } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { NavigationExtras, Router } from '@angular/router';
import { SignalService } from '@services/signal.service';

@Component({
  selector: 'app-view-controller',
  templateUrl: './view-controller.component.html',
  styleUrls: ['./view-controller.component.scss'],
})
export class ViewControllerComponent {
  constructor(private router: Router, private signalService: SignalService) {}

  sortData(sort: Sort) {
    let navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { sortDirection: sort.direction },
    };

    this.router.navigate([], navigationExtras).then(() => this.sortLabel.set(sort.direction));
  }

  setGrid(grid: 2 | 4) {
    this.signalService.viewGridSizeSignal.set(grid);
  }

  sortLabel = signal<string>('asc');
}
