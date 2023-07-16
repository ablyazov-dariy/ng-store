import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  isSmall$: Observable<boolean>;

  constructor() {
    this.isSmall$ = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
      map(result => result.matches),
      shareReplay()
    );
  }
}
