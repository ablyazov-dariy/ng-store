import { ManageService } from '@admin/services/manage.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-manage-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './manage-form.component.html',
  styleUrls: ['./manage-form.component.scss'],
})
export class ManageFormComponent {
  private manageService = inject(ManageService);

  get form() {
    return this.manageService.form();
  }
  debounceRace() {
    // TODO
    return this.manageService.debounceTrigger.next(true);
  }
}
