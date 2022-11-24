import { Component, OnInit } from '@angular/core';
import { Boulder } from 'src/app/models/boulder.model';
import { BoulderService } from 'src/app/services/boulder.service';

@Component({
  selector: 'app-boulders',
  templateUrl: './boulders.component.html',
  styleUrls: ['./boulders.component.sass']
})
export class BouldersComponent implements OnInit {
  boulders: Boulder[];
  currentBoulder: Boulder;

  constructor(private boulderService: BoulderService) {
    this.boulders = new Array<Boulder>;
    this.currentBoulder = new Boulder();
  }

  ngOnInit() {
    this.getBoulders();
  }

  getBoulders() {
    this.boulderService.getAll().subscribe({
      next: (data) => {
        this.boulders = data;
      }
    });
  }
}
