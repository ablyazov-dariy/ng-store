import { Component, effect, EffectRef, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { masks } from '@components/user/account-card/masks';
import { UserDataInterface } from '@interfaces/user-data.interface';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  public userData = toSignal(this.userService.userData$);
  public user = toSignal(this.userService.user$);
  public editMode = signal(false);

  private editModeEffect: EffectRef = effect(this.editModeEffectFunc.bind(this));
  private patchEff: EffectRef = effect(this.patchEffectFunc.bind(this), {
    allowSignalWrites: true,
  });

  public form = this.getForm();
  private maskActiveIndex = masks.length;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  get activeMask() {
    return masks.at(this.maskActiveIndex);
  }

  nextMask() {
    if (this.maskActiveIndex < masks.length) {
      this.maskActiveIndex++;
    } else {
      this.maskActiveIndex = 0;
    }
  }

  public updateMode() {
    this.editMode.update(value => !value);
  }

  private editModeEffectFunc(this: AccountCardComponent) {
    if (this.editMode()) {
      this.form.enable();
    } else {
      this.form.disable();
      this.saveChanges();
    }
  }

  private patchEffectFunc(this: AccountCardComponent) {
    this.form.patchValue({
      name: this.userData()?.name ?? (this.user()?.displayName as string),
      photoURL: this.userData()?.photoURL ?? (this.user()?.photoURL as string),
      bio: this.userData()?.bio ?? 'Your Bio',
    });
  }

  private saveChanges() {
    if (this.form.touched) {
      this.userService.updateUserData(this.form.value as UserDataInterface);
    }
  }

  private getForm() {
    return this.fb.group({
      name: [''],
      photoURL: [''],
      bio: [''],
    });
  }
}
