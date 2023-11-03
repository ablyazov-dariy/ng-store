import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-open-btn',
  templateUrl: './search-open-btn.component.html',
  styleUrls: ['./search-open-btn.component.scss'],
})
export class SearchOpenBtnComponent implements OnInit {
  form = this.buildForm();

  constructor(private fb: FormBuilder, private router: Router, private destroyRef: DestroyRef) {}

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
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.router
        .navigate(['/shop'], {
          queryParams: {
            searchQuery: value.search,
            newOnly: value.new,
            featured: value.featured,
          },
        })
        .then();
    });
  }
}
