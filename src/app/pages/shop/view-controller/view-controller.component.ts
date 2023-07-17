import { Component } from '@angular/core';

@Component({
  selector: 'app-view-controller',
  templateUrl: './view-controller.component.html',
  styleUrls: ['./view-controller.component.scss'],
})
export class ViewControllerComponent {
  // activatedRoute = inject(ActivatedRoute);
  // router = inject(Router);
  // sortLabel = computed((): 'low to high' | 'high to low' | '' => {
  //   if (this.dataStateService.filtersState().sort === 'asc') {
  //     return 'low to high';
  //   } else if (this.dataStateService.filtersState().sort === 'desc') {
  //     return 'high to low';
  //   } else {
  //     return '';
  //   }
  // });
  // sortData(sort: Sort): void {
  //   // this.dataStateService.sort.set(sort.direction);
  //
  //   this.router.navigateByUrl('shop?q=12').then(() => {
  //     console.log('add q');
  //   });
  // }
  //
  // setGrid(num: number) {
  //   this.dataStateService.gridSize.set(num);
  // }
}
