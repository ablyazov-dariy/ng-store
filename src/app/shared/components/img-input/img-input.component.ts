import { Component, DestroyRef, OnChanges, signal, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-img-input',
  templateUrl: './img-input.component.html',
  styleUrls: ['./img-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImgInputComponent,
      multi: true,
    },
  ],
})
export class ImgInputComponent implements ControlValueAccessor, OnChanges {
  private onChange?: (value: string | null) => void;
  private onTouched?: () => void;
  public disabled: boolean = false;

  uploadState?: string;
  private url = signal<string | undefined>(undefined);

  constructor(private angularFireStorage: AngularFireStorage, private destroyRef: DestroyRef) {}

  ngOnChanges(changes: SimpleChanges): void {}

  writeValue(url: string): void {
    this.url.set(url);
  }

  onFileChange(input: HTMLInputElement) {
    const file = input.files ? input.files[0] : null;
    if (!file) return;

    from(this.angularFireStorage.upload('products/' + file.name, file))
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(taskSnapshot => (this.uploadState = taskSnapshot.state)),
        map(taskSnapshot => taskSnapshot.ref),
        switchMap(ref => from(ref.getDownloadURL()))
      )
      .subscribe(url => {
        this.url.set(url);
        this.onChange?.(url);
      });
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputTouched() {
    this.onTouched?.();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
