import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})

export class UserComponent {
  imageSrc: string = '';
  user: User = new User();

  constructor(
    public userService: UserService,
    public imageService: ImageService,
    private router: Router) { 
      const id = this.userService.getUserId();
      this.userService.getById(id).subscribe({
        next: (data: User) => {
          this.user = data;
          if (this.user.picture == null) {
            this.imageSrc = 'assets/img/bob.jpg'
          } else {
            this.imageSrc = 'http://localhost:9000/storage/img/users/' + this.user.picture + '.png';
          }
        }
      })
    }

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

  uploadImage(event: any) {
    const id = this.userService.getUserId();
    if (id == 0) {
      console.log('no login.')
    } else {
      const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      this.imageService.upload('users', id, formData).subscribe({
        next: (data: string) => {
          this.imageSrc = 'http://localhost:9000/storage/img/users/' + data + '.png';
        }
      });
    }
  }

  deleteImage() {
    this.imageService.delete('users',this.user.userId,this.user.picture);
    this.imageSrc = 'assets/img/bob.jpg'
  }

  deleteUser() {
    this.userService.deleteUser(this.userService.getUserId());
    this.userService.setLoggedOut();
    this.router.navigateByUrl('');
  }
}
