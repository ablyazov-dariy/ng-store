import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterLimit',
})
export class CharacterLimitPipe implements PipeTransform {
  transform(value: string, maxLength: number, dots: boolean = true): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substring(0, maxLength) + (dots ? '...' : '');
    }
  }
}
