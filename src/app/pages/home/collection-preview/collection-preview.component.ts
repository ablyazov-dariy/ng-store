import { Component, Input } from '@angular/core';

import { Collection } from '../../../interfaces/collection';

@Component({
  selector: 'app-collection-preview',
  templateUrl: './collection-preview.component.html',
  styleUrls: ['./collection-preview.component.scss'],
})
export class CollectionPreviewComponent {
  cols: number = 2;
  @Input({ required: true }) collections!: Collection[];

  calculateGap(): string {
    return `${10 / this.cols}%`;
  }
}
