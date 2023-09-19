import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardType',
})
export class CardTypePipe implements PipeTransform {
  private cardTypeMap = new Map<RegExp, string>([
    [/^4[0-9]{0,12}(?:[0-9]{0,3})?$/, 'Visa'],
    [/^5[1-5][0-9]{0,14}$/, 'MasterCard'],
    // Add other card types and their regex here
  ]);

  transform(value: string): string {
    for (const [regex, cardType] of this.cardTypeMap.entries()) {
      if (regex.test(value)) {
        return cardType;
      }
    }
    return 'Unknown';
  }
}
