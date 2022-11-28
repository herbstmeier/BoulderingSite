import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
  constructor(
    public userService: UserService,
    private router: Router) { }

  submitLogout() {
    this.userService.setLoggedOut();
    this.router.navigateByUrl('');
  }
}
