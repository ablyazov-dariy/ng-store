import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}
  get(url: string) {
    return this.http.get(url).pipe(shareReplay(3));
  }

  put(url: string, body: any) {
    return this.http.put(url, body);
  }
}
