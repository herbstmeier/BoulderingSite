import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  mainContainer?: ElementRef;

  constructor() { }

  scrollToBottom() {
    if (this.mainContainer) {
      this.mainContainer.nativeElement.scrollTop = this.mainContainer.nativeElement.scrollHeight;
    }
  }
}
