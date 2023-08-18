import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  keys: string[];
  notifier = fromEvent(window, 'storage') as Observable<StorageEvent>;
  constructor() {
    this.keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)) {
        this.keys.push(localStorage.key(i)!);
      }
    }
  }

  getItem(key: string): unknown {
    return JSON.parse(localStorage.getItem(key)!) as unknown;
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
