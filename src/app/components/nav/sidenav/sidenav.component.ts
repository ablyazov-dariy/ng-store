import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
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
