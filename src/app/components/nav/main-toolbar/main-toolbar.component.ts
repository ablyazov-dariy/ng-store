import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
})
export class MainToolbarComponent {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  isSmall$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  expansionPanelOpened: WritableSignal<boolean> = signal(false);

  closeExpansionPanel(): void {
    this.expansionPanelOpened.set(false);
  }
}
