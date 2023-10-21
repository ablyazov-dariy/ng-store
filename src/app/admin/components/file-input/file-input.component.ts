import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent implements ControlValueAccessor {
  @Input({ required: true, alias: 'formControl' }) control?: FormControl;

  onFileUpload(event: Event): void {
    // todo: img upload
    this.control?.patchValue(URL.createObjectURL((event.target as HTMLInputElement).files![0]));
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {}
}
