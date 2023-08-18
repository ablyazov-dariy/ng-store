import { Injectable } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';
import { Observable, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private readonly accessKey: 'likesStorageKey' = 'likesStorageKey';
  private likesMap: Map<number, boolean>;
  private likesMap$: Subject<Map<number, boolean>> = new Subject();

  constructor(private ls: LocalStorageService) {
    const storedData = this.ls.getItem(this.accessKey) as [number, boolean][];

    storedData ? (this.likesMap = new Map(storedData)) : (this.likesMap = new Map());

    this.ls.notifier.subscribe(event => {
      if (event.key !== this.accessKey) return;
      if (!event.newValue) return;
      this.likesMap = new Map(JSON.parse(event.newValue));
      this.likesMap$.next(this.likesMap);
    });
  }

  private observe() {
    this.ls.setItem(this.accessKey, Array.from(this.likesMap));
    this.likesMap$.next(this.likesMap);
  }

  public toggleLike(id: number, like: boolean): void {
    this.likesMap.set(id, like);
    if (like) {
      this.likesMap.set(id, like);
    } else this.likesMap.delete(id);

    this.observe();
  }

  likesMapAsObservable(): Observable<Map<number, boolean>> {
    return this.likesMap$.asObservable().pipe(startWith(this.likesMap));
  }
}
