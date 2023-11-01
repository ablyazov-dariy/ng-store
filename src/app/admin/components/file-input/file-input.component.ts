import { Component, computed, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputComponent,
      multi: true,
    },
  ],
})
export class FileInputComponent implements ControlValueAccessor, OnInit {
  public disabled: boolean = false;
  private onChange?: (value: File | null) => void;
  private onTouched?: () => void;

  file = signal<File | string | null>(null);

  url = computed((): void | string => {
    const file = this.file();
    if (!file) return;
    if (typeof file !== 'string') {
      try {
        // do I have to revokeObjectURL() ?
        return URL.createObjectURL(file);
      } catch (error) {
        console.error(error);
      }
    } else {
      return file as string;
    }
  });

  ngOnInit(): void {}

  writeValue(obj: File): void {
    this.file.set(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFileChange(input: HTMLInputElement) {
    const file = input.files ? input.files[0] : null;
    if (file) {
      this.file.set(file);
      this.onChange?.(file);
    }
  }

  onInputTouched() {
    this.onTouched?.();
  }
}
