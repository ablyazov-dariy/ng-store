import { Component, OnInit, signal } from '@angular/core';
import { Sort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SignalService } from '@services/signal.service';

@Component({
  selector: 'app-view-controller',
  templateUrl: './view-controller.component.html',
  styleUrls: ['./view-controller.component.scss'],
})
export class ViewControllerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signalService: SignalService
  ) {}

  ngOnInit(): void {
    this.sortLabel.set(this.route.snapshot.queryParams['sortDirection']);
  }

  sortData(sort: Sort) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { sortDirection: sort.direction },
    };

    this.router.navigate([], navigationExtras).then(() => this.sortLabel.set(sort.direction));
  }

  setGrid(grid: 2 | 4) {
    this.signalService.viewGridSizeSignal.set(grid);
  }

  sortLabel = signal<SortDirection>('asc');
}
