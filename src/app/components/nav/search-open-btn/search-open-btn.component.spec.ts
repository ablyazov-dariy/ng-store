import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOpenBtnComponent } from './search-open-btn.component';

describe('SearchOpenBtnComponent', () => {
  let component: SearchOpenBtnComponent;
  let fixture: ComponentFixture<SearchOpenBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchOpenBtnComponent]
    });
    fixture = TestBed.createComponent(SearchOpenBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
