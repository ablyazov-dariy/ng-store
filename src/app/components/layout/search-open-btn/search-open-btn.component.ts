import { Component, effect, Injector, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-open-btn',
  templateUrl: './search-open-btn.component.html',
  styleUrls: ['./search-open-btn.component.scss'],
})
export class SearchOpenBtnComponent implements OnInit {
  form = this.buildForm();
  // toSignal works as async pipe, so I don`t need to unsubscribe
  private formValue = toSignal(this.form.valueChanges);

  constructor(private fb: FormBuilder, private router: Router, private injector: Injector) {}

  ngOnInit(): void {
    this.initializeNavigation();
  }

  private buildForm() {
    return this.fb.group({
      search: [''],
      new: [false],
      featured: [false],
    });
  }

  private initializeNavigation(): void {
    effect(
      () => {
        this.router
          .navigate(['/shop'], {
            queryParams: {
              searchQuery: this.formValue()?.search,
              newOnly: this.formValue()?.new,
              featured: this.formValue()?.featured,
            },
          })
          .then();
      },
      { injector: this.injector }
    );
  }
}
