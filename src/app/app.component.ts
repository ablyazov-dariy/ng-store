import { Component } from '@angular/core';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'ngStore';

  public data: Product = {
    id: 1,
    name: 'Test',
    price: 100,
    description: 'Test',
    image: 'https://picsum.photos/200/300',
    discount: 10,
  };
}
