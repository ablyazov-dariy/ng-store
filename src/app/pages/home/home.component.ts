import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Collection } from '../../interfaces/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Camiseta',
      image: 'https://picsum.photos/200/300',
      price: 80000,
      description: 'bla bla bla bla bla',
    },
    {
      id: 2,
      name: 'Hoodie',
      image: 'https://picsum.photos/200/300',
      price: 80000,
      description: 'bla bla bla bla bla',
      discount: 10,
    },
    {
      id: 3,
      name: 'Mug',
      image: 'https://picsum.photos/200/300',
      price: 80000,
      discount: 10,
      description: 'bla bla bla bla bla',
    },
    {
      id: 4,
      name: 'Pin',
      image: 'https://picsum.photos/200/300',
      price: 80000,
      description: 'bla bla bla bla bla',
    },
  ];

  collections: Collection[] = [
    {
      name: 'Best Sellers',
      img: 'https://picsum.photos/200/300',
      contain: 'dress',
    },
    {
      name: 'All Over Velvet',
      img: 'https://picsum.photos/200/300',
      contain: 'velvet',
    },
  ];
}