import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  @ViewChild('mapsModal') mapsModal?: ElementRef<HTMLDialogElement>;
  phone = '+1(123) 456 - 7890';
  eMail = 'contact@example.com';

  onModalClick(event: MouseEvent): void {
    const dialogDimensions: DOMRect | undefined =
      this.mapsModal?.nativeElement.getBoundingClientRect();

    if (
      event.clientX < (dialogDimensions?.left ?? 0) ||
      event.clientX > (dialogDimensions?.right ?? 0) ||
      event.clientY < (dialogDimensions?.top ?? 0) ||
      event.clientY > (dialogDimensions?.bottom ?? 0)
    ) {
      this.mapsModal?.nativeElement.close();
    }
  }
}
