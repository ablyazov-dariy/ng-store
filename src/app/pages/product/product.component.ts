import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(parms => {
      console.log(parms);
    });
  }
}
