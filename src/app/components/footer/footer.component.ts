import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.emailFormControl.valid) {
      console.log(this.emailFormControl.value);
    }
  }
}
