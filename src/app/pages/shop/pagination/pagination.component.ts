import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  current = signal(0);

  constructor(private router: Router, private route: ActivatedRoute) {}

  previous() {
    this.current.update(value => {
      if (value > 0) {
        value -= 12;
      }
      return value;
    });
  }

  next() {
    this.current.update(value => {
      value += 12;
      return value;
    });
  }

  changeEffect = effect(() => {
    const queryParams = { ...this.route.snapshot.queryParams };
    queryParams['limit'] = 12 + this.current();
    queryParams['startWith'] = this.current();
    this.router
      .navigate(['shop'], {
        queryParams,
      })
      .then();
  });
}
