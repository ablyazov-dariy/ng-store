import { AdminProductsService } from '@admin/services/admin-products.service';
import { ManageService } from '@admin/services/manage.service';
import { A11yModule, FocusMonitor } from '@angular/cdk/a11y';
import { CdkMenu, CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { combineLatestWith, debounce, filter, map, merge, Observable, startWith } from 'rxjs';

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
    private adminProductsService: AdminProductsService,
    private focusMonitor: FocusMonitor,
    private destroyRef: DestroyRef
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
    return merge(this.setCreateState$(), this.setEditSearchState$(), this.setDeleteState$());
  }

  setEditSearchState$() {
    return this.adminProductsService.products$.pipe(
      combineLatestWith(this.chooseControl.valueChanges),
      filter(([data, value]) => !!value),
      map(([data, value]) => (data.some(item => item.id === value) ? 'edit' : 'search'))
    );
  }

  setCreateState$() {
    return this.chooseControl.valueChanges.pipe(
      startWith(null),
      filter(value => !value),
      map(() => 'create')
    );
  }

  setDeleteState$() {
    return this.chooseControl.valueChanges.pipe(
      filter(() => this.state() === 'edit'),
      debounce(() => this.clicksEvents),
      map(() => 'delete')
    );
  }

  private autocomplete$(): Observable<{ id: string; name: string }[]> {
    return this.adminProductsService.products$.pipe(
      combineLatestWith(this.chooseControl.valueChanges),
      map(([data, query]) =>
        data
          .map(item => ({ id: item.id, name: item.name }))
          .filter(
            item =>
              (item.name.toLowerCase().includes(query?.toLowerCase() ?? '') ||
                item.id.startsWith(query ?? '')) &&
              query !== '' &&
              item.id !== query
          )
          .slice(0, 4)
      )
    );
  }

  onAutocompleteClick(event: Event) {
    this.chooseControl.patchValue((event.target as HTMLElement).getAttribute('data-my-id'));
  }
}
