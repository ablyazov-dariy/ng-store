import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterStateService {
  public sortDirection = signal<'asc' | 'desc' | ''>('asc');
}
