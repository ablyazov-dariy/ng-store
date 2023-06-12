import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPreviewComponent } from './collection-preview.component';

describe('CollectionPreviewComponent', () => {
  let component: CollectionPreviewComponent;
  let fixture: ComponentFixture<CollectionPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionPreviewComponent]
    });
    fixture = TestBed.createComponent(CollectionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
