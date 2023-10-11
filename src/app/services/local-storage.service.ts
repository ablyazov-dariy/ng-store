import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  notifier = fromEvent(window, 'storage') as Observable<StorageEvent>;

  getItem(key: string): unknown {
    let str = localStorage.getItem(key) ?? 'null';
    try {
      return JSON.parse(str) as unknown;
    } catch (err) {
      return str;
    }
  }

  setItem<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      localStorage.setItem(key, (err as Error).message);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
