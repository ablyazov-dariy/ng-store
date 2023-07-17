import { effect, Injectable, signal, Signal } from '@angular/core';
import { AsyncConverterInterface } from '@interfaces/async-converter.interface';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsyncConverterService implements AsyncConverterInterface {
  fromObservable<T>(observable: Observable<T>, initialValue: T): Signal<T> {
    const mySignal = signal<T>(initialValue);
    observable.subscribe(data => {
      mySignal.set(data);
    });
    return mySignal;
  }

  toObservable<T>(signal: Signal<T>): Observable<T> {
    const subject$ = new Subject<T>();
    effect(
      () => {
        subject$.next(signal());
      },
      { allowSignalWrites: true }
    );
    return subject$.asObservable();
  }
}
