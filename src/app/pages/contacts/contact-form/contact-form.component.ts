import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  sent = false;
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.contactForm.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // TODO: ...
    });
  }

  onSubmit() {
    if (!this.contactForm.valid) return;
    this.sent = true;
    this.contactForm.markAsUntouched();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
