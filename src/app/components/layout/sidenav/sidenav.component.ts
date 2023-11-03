import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @ViewChild('drawer') drawer?: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  isSmall$ = this.getSmallScreen$();

  drawerToggle() {
    this.drawer?.toggle();
  }

  private getSmallScreen$(): Observable<boolean> {
    return this.breakpointObserver.observe('(max-width: 1024px)').pipe(
      map(result => result.matches),
      shareReplay(2)
    );
  }
}
