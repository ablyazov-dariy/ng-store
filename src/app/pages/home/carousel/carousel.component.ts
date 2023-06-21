import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { filter, Subject, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLElement>;
  @Input() slides: any[] = [0, 1, 2, 3, 4, 5];
  destroy$: Subject<boolean> = new Subject();

  activeSlideIndex: WritableSignal<number> = signal(0);

  ngAfterViewInit() {
    timer(0, 3000)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => !this.carousel.nativeElement.matches(':hover'))
      )
      .subscribe(() => {
        this.activeSlideIndex.update(x => {
          if (x === this.slides.length - 1) {
            return 0;
          }
          return x + 1;
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
