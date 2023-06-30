import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Collection } from '../../../interfaces/collection';

@Component({
  selector: 'app-collection-preview',
  templateUrl: './collection-preview.component.html',
  styleUrls: ['./collection-preview.component.scss'],
})
export class CollectionPreviewComponent {
  cols: number = 2;
  @Input({ required: true }) collections!: Collection[];

  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  isSmall$: Observable<number>

  constructor() {
    this.isSmall$ = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => result.matches),
        map(matches => (matches ? 0.5 : 1)),
        shareReplay()
      );
  }

  calculateGap(): string {
    return `${10 / this.cols}%`;
  }
}
