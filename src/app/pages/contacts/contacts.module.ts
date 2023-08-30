import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContactFormComponent } from './contact-form/contact-form.component';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';

@NgModule({
  declarations: [ContactsComponent, ContactFormComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
})
export class ContactsModule {}
