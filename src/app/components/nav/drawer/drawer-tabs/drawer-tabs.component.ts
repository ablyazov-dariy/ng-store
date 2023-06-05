import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-drawer-tabs',
  templateUrl: './drawer-tabs.component.html',
  styleUrls: ['./drawer-tabs.component.scss'],
})
export class DrawerTabsComponent {
  tabsLoadedContent: any[] = [];

  getTabContent(index: number): Observable<any> {
    if (!this.tabsLoadedContent[index]) {
      this.tabsLoadedContent[index] = of(index);
    }
    return this.tabsLoadedContent[index];
  }
}
