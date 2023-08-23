import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountCalculator',
})
export class DiscountCalculatorPipe implements PipeTransform {
  transform(value: number, discount: number): number {
    return value - (value * discount) / 100;
  }
}
