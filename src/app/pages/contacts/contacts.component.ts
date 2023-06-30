import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements AfterViewInit {
  @ViewChild('mapsModal') mapsModal?: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    console.log(this.mapsModal);
  }

  onModalClick(event: MouseEvent): void {
    const dialogDimensions: DOMRect = this.mapsModal!.nativeElement.getBoundingClientRect();
    console.log(event);
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      this.mapsModal!.nativeElement.close();
    }
  }
}
