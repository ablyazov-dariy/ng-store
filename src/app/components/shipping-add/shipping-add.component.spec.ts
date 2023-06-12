import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipingAddComponent } from './shipping-add.component';

describe('ShipingAddComponent', () => {
  let component: ShipingAddComponent;
  let fixture: ComponentFixture<ShipingAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipingAddComponent],
    });
    fixture = TestBed.createComponent(ShipingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
