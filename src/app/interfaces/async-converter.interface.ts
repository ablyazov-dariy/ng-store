import { Signal } from '@angular/core';

import { Observable } from 'rxjs';

export interface AsyncConverterInterface {
  fromObservable<T>(observable: Observable<T>, initialValue: T): Signal<T>;
  toObservable<T>(signal: Signal<T>): Observable<T>;
}
