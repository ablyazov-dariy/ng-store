import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent {
  #close$: EventEmitter<void> = new EventEmitter<void>();
  @Output() close$ = this.#close$.asObservable();

  public onCloseClicked(): void {
    this.#close$.emit();
  }
}
