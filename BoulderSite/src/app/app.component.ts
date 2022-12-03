import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('main') main?: ElementRef;

  constructor(private scrollService: ScrollService) { }

  ngAfterViewInit(): void {
    this.scrollService.mainContainer = this.main;
  }

  title = 'BoulderSite';
}
