import { Component, OnInit } from '@angular/core';
import { Boulder } from 'src/app/shared/models/boulder.model';
import { BoulderService } from 'src/app/shared/services/boulder.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-boulders',
  templateUrl: './boulders.component.html',
  styleUrls: ['./boulders.component.sass']
})
export class BouldersComponent implements OnInit {
  boulders: Boulder[];
  selectedBoulder: Boulder;

  constructor(
    private boulderService: BoulderService, public userService: UserService) {
    this.boulders = new Array<Boulder>;
    this.selectedBoulder = new Boulder();
  }

  ngOnInit() {
    this.getAllBoulders();
  }

  getAllBoulders() {
    this.boulderService.getAll().subscribe((data: Boulder[]) => this.boulders = data);
  }
}
