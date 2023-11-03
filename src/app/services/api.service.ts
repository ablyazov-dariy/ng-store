import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}
  get(url: string): Observable<any> {
    return this.http.get(url).pipe(shareReplay(3));
  }

  put(url: string, body: any) {
    return this.http.put(url, body);
  }
  post(url: string, body: any) {
    return this.http.post(url, body);
  }
}
