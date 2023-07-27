import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  viewGridSizeSignal = signal<number>(4);
}
