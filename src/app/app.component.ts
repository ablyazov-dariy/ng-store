import { Component } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngStore';

  public data: ProductInterface = {
    id: 1,
    name: 'Test',
    price: 100,
    description: 'Test',
    image: 'https://picsum.photos/200/300',
    discount: 10,
  };
}
