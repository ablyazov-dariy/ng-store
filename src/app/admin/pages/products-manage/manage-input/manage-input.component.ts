import { ManageService } from '@admin/services/manage.service';
import { A11yModule, FocusMonitor } from '@angular/cdk/a11y';
import { CdkMenu, CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccessLevel } from '@app/enums/access-level';
import { ProductsService } from '@services/products.service';
import { UserService } from '@services/user.service';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  share,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-manage-input',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenu,
    ReactiveFormsModule,
    CdkMenuModule,
    RouterModule,
    OverlayModule,
    A11yModule,
  ],
  templateUrl: './manage-input.component.html',
  styleUrls: ['./manage-input.component.scss'],
})
export class ManageInputComponent implements OnInit {
  public autocomplete = toSignal(this.autocomplete$());
  public state = toSignal(this.mergedState$());
  @Output() public clicksEvents = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private manageService: ManageService,
    private productsService: ProductsService,
    private focusMonitor: FocusMonitor,
    private userService: UserService
  ) {}

  get chooseControl() {
    return this.manageService.chooseControl;
  }

  get currentRoute() {
    return this.route.children[0].url;
  }

  ngOnInit(): void {
    //   TODO: close panel on focus
  }

  mergedState$(): Observable<string> {
    return merge(
      this.setCreateState$(),
      this.setSearchState$(),
      this.setDeleteState$(),
      this.setEditState$()
    );
  }

  setEditState$() {
    return this.chooseControl.valueChanges.pipe(
      filter(value => !!value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => this.productsService.getProductById$(value!)),
      filter(value => value.exists),
      map(() => 'edit')
    );
  }
  setSearchState$() {
    return this.chooseControl.valueChanges.pipe(
      filter(value => !!value),
      map(() => 'search'),
      share()
    );
  }

  setCreateState$() {
    return this.chooseControl.valueChanges.pipe(
      startWith(null),
      filter(value => !value && this.userService.roleLevel < AccessLevel.owner),
      map(() => 'create')
    );
  }

  setDeleteState$() {
    return this.setEditState$().pipe(
      debounce(() => this.clicksEvents),
      map(() => 'delete')
    );
  }

  private autocomplete$(): Observable<{ id: string; name: string }[]> {
    return this.chooseControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      mergeMap(value => this.productsService.getProducts$({ searchQuery: value })),
      map(data =>
        data
          .map(item => ({ id: item.id, name: item.name }))
          .filter(item => this.chooseControl.value !== '' && item.id !== this.chooseControl.value)
          .slice(0, 4)
      )
    );
  }

  onAutocompleteClick(event: Event) {
    this.chooseControl.patchValue((event.target as HTMLElement).getAttribute('data-my-id'));
  }
}
