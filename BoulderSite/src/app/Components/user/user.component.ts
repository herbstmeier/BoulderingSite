import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent {
  constructor(
    public userService: UserService,
    private router: Router) { }

  updateUserInfo() {
    const newInfoUser: User = new User();
    this.userService.updateInfo(newInfoUser);
  }

  updateUserPassword() {
    const id = this.userService.getUserId();
    if (id == 0) {
      console.log('no login.')
    } else {
      this.userService.updatePw({ id: id, password: 'qweQWE123!@#' });
    }
  }

  deleteUser() {
    this.userService.deleteUser(this.userService.getUserId());
    this.userService.setLoggedOut();
    this.router.navigateByUrl('');
  }

  getAll() {
    this.userService.getAll().subscribe({
      next: (data: User[]) => {
        
      }
    })
  }
}
