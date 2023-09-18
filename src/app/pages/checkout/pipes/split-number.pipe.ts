import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitNumber',
})
export class SplitNumberPipe implements PipeTransform {
  transform(value: string | null, length: number = 4): string {
    let chunks = value?.match(new RegExp('.{1,' + length + '}', 'g'));
    return chunks?.join(' ') ?? '';
  }
}
