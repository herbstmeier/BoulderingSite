import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { ClimbService } from 'src/app/shared/services/climb.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { RatingService } from 'src/app/shared/services/rating.service';
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
    private commentService: CommentService,
    private climbService: ClimbService,
    private ratingService: RatingService,
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
          this.imageSrc = 'http://localhost:9000/storage/img/users/' + this.user.picture;
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
    this.userService.updatePw({ id: id, password: 'qweQWE123!@#' });
  }

  uploadImage(event: any) {
    const id = this.userService.getUserId();
    const file: File = event.target.files[0];
    if (file != null) {
      const formData = new FormData();
      formData.append('image', file);
      this.imageService.upload('users', id, formData).subscribe({
        next: (data: string) => {
          this.user.picture = data;
        },
        complete: () => {
          this.imageSrc = 'http://localhost:9000/storage/img/users/' + this.user.picture;
        }
      });
    }

  }

  deleteImage() {
    this.imageService.delete('users', this.user.userId, this.user.picture);
    this.user.picture = '';
    this.imageSrc = 'assets/img/bob.jpg'
  }

  deleteUser() {
    this.climbService.deleteByUser(this.user.userId);
    this.commentService.deleteByUser(this.user.userId);
    this.ratingService.deleteByUser(this.user.userId);
    this.userService.deleteUser(this.user.userId);
    this.userService.setLoggedOut();
    this.router.navigateByUrl('');
  }
}
