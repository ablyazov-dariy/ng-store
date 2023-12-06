import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input({ required: true }) showMenu = false;
  @Output() menuClicks: EventEmitter<void> = new EventEmitter();
}
