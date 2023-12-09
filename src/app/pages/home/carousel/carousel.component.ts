import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { filter, interval, tap } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @ViewChild('sliderRef', { static: true }) sliderRef!: ElementRef<HTMLElement>;
  private keenSlider?: KeenSliderInstance;
  private destroyRef = inject(DestroyRef);

  isMouseOver = signal(false);

  ngOnInit(): void {
    this.keenSlider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
        created: () => {
          console.log('created');
        },
      },
      [
        slider => {
          this.autoplay().subscribe(slider.next);
        },
      ]
    );
  }

  autoplay() {
    return interval(25000).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(console.log),
      filter(() => !this.isMouseOver())
    );
  }

  ngOnDestroy(): void {
    this.keenSlider?.destroy();
  }
}
