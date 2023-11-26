import { ManageService } from '@admin/services/manage.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-search',
  templateUrl: './manage-search.component.html',
  styleUrls: ['./manage-search.component.scss'],
})
export class ManageSearchComponent {
  constructor(private route: ActivatedRoute, private manageService: ManageService) {}

  get currentRoute() {
    return this.route.children[0].url;
  }

  get chooseControl() {
    return this.manageService.chooseControl;
  }
}
