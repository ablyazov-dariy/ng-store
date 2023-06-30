import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { CollectionInterface } from '@interfaces/collection.interface';
import { filter, Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLElement>;
  @Input() slides: CollectionInterface[] = [
    { name: 'slide 1', img: 'https://picsum.photos/seed/1/800/400', contain: 'contain' },
    { name: 'slide 2', img: 'https://picsum.photos/seed/2/800/400', contain: 'contain' },
    { name: 'slide 3', img: 'https://picsum.photos/seed/3/800/400', contain: 'contain' },
  ];
  destroy$: Subject<boolean> = new Subject();

  activeSlideIndex: WritableSignal<number> = signal(0);

  ngAfterViewInit() {
    this.carouselRunner();
  }

  carouselRunner(): void {
    timer(3000, 3000)
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
