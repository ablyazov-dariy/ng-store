import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterLimit',
})
export class CharacterLimitPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substring(0, maxLength) + '...';
    }
  }
}
// 4.Create and apply custom pipe for characters limitation (~ 35 char.) in Description
// but i dont know why we need this pipe, because we can use css for this
// and i dont know where to use this pipe, cause i dont haw description on my cards
