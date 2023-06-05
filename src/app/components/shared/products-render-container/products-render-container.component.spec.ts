import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRenderContainerComponent } from './products-render-container.component';

describe('ProductsRenderContainerComponent', () => {
  let component: ProductsRenderContainerComponent;
  let fixture: ComponentFixture<ProductsRenderContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsRenderContainerComponent],
    });
    fixture = TestBed.createComponent(ProductsRenderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
