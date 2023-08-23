import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  notifier = fromEvent(window, 'storage') as Observable<StorageEvent>;

  getItem(key: string): unknown {
    return JSON.parse(localStorage.getItem(key) ?? 'null') as unknown;
  }

  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
