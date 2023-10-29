import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-open-btn',
  templateUrl: './search-open-btn.component.html',
  styleUrls: ['./search-open-btn.component.scss'],
})
export class SearchOpenBtnComponent {
  @Input({ required: true }) isXSmall!: boolean;
}
