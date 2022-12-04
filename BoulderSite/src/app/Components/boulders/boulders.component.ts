import { Component, OnInit } from '@angular/core';
import { Boulder } from 'src/app/shared/models/boulder.model';
import { SelectSetter } from 'src/app/shared/models/user.model';
import { BoulderService } from 'src/app/shared/services/boulder.service';
import { ColorService } from 'src/app/shared/services/color.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-boulders',
  templateUrl: './boulders.component.html',
  styleUrls: ['./boulders.component.sass']
})
export class BouldersComponent implements OnInit {
  boulders: Boulder[] = new Array<Boulder>;
  selectedBoulder: Boulder = new Boulder();
  setters: SelectSetter[] = new Array<SelectSetter>;

  isExpandedView: boolean = false;

  constructor(
    private boulderService: BoulderService, public userService: UserService, private colorService: ColorService) {
  }

  ngOnInit() {
    this.boulderService.getAll();
    this.userService.getSetters();
    this.colorService.getAll();
  }

  toggleExpandedView() {
    this.isExpandedView = !this.isExpandedView;
  }
}
