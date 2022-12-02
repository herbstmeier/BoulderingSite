import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnDestroy {
  selectedPage = 0;
  private routerSubscription
  pagesLoggedOut: string[] = ['','about','boulders','','login'];
  pagesLoggedIn: string[] = ['','about','boulders','user','logout'];

  constructor(
    public userService: UserService,
    private router: Router) {
    this.routerSubscription = router.events.subscribe({
      next: (e) => {
        if (e instanceof NavigationEnd)
          this.setSelectedPage(e);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  submitLogout() {
    this.userService.setLoggedOut();
  }

  setSelectedPage(event: NavigationEnd) {
    var path = event.url.substring(1);
    const isParentPath = path.includes('/');
    if (isParentPath) {
      path = path.substring(0,path.indexOf('/'))
    }
    this.selectedPage = this.userService.isLoggedIn() ? this.pagesLoggedIn.indexOf(path) : this.pagesLoggedOut.indexOf(path);
  }
}
