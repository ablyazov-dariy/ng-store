import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerTabsComponent } from './drawer-tabs.component';

describe('DrawerTabsComponent', () => {
  let component: DrawerTabsComponent;
  let fixture: ComponentFixture<DrawerTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerTabsComponent]
    });
    fixture = TestBed.createComponent(DrawerTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
