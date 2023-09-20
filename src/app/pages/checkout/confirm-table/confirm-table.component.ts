import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-table',
  templateUrl: './confirm-table.component.html',
  styleUrls: ['./confirm-table.component.scss'],
})
export class ConfirmTableComponent {
  displayedColumns: string[] = ['id', 'name', 'color', 'size'];
  @Input({ required: true }) products!: {
    name: string;
    id: number;
    color: string;
    size: string;
  }[];
  @Input({ required: true }) address!: string;
}
