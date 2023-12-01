import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LocalStorageService } from '@services/local-storage.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private readonly accessKey = environment.likeAccessKey;
  private likesMap: Map<string, boolean>;
  public likesMap$: BehaviorSubject<Map<string, boolean>>;

  constructor(private ls: LocalStorageService) {
    const storedData = this.ls.getItem(this.accessKey) as [string, boolean][];

    storedData ? (this.likesMap = new Map(storedData)) : (this.likesMap = new Map());

    this.likesMap$ = new BehaviorSubject(this.likesMap);
    this.handelStorageEvent();
  }

  private observe() {
    this.ls.setItem(this.accessKey, Array.from(this.likesMap));
    this.likesMap$.next(this.likesMap);
  }

  private handelStorageEvent() {
    this.ls.notifier.subscribe(event => {
      if (event.key !== this.accessKey) return;
      if (!event.newValue) return;
      this.likesMap = new Map(JSON.parse(event.newValue));
      this.likesMap$.next(this.likesMap);
    });
  }

  public toggleLike(id: string, like: boolean): void {
    if (like) {
      this.likesMap.set(id, like);
    } else this.likesMap.delete(id);
    this.observe();
  }
}
