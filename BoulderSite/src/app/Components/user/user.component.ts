import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Climb } from 'src/app/shared/models/climb.model';
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

export class UserComponent implements OnInit, OnDestroy {
  id: number = 0;
  imageSrc: string = '';
  user: User = new User();
  climbs: Climb[] = new Array();
  flashPercent: number = 0;
  selectedAction: number = 0;
  showPassword: boolean = false;
  updatePwForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z!-@]*')]]
  });
  routerSubscription?: Subscription;

  constructor(
    private commentService: CommentService,
    private climbService: ClimbService,
    private ratingService: RatingService,
    public userService: UserService,
    public imageService: ImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }
  ngOnInit(): void {
    this.routerSubscription = this.activatedRoute.params.subscribe(p => {
      this.id = Number.parseInt(p['id']);
      // get user
      this.userService.getById(this.id).subscribe((data: User) => {
        this.user = data;
        if (this.user.picture == null) {
          this.imageSrc = 'assets/img/defaultUser.jpg'
        } else {
          this.imageSrc = 'http://localhost:9000/storage/img/users/' + this.user.picture;
        }
      });

      // get climbs
      this.climbService.getByUser(this.id).subscribe(data => this.climbs = data);
      // get flashes
      const flashes = this.climbs.filter(climb => {
        return climb.isFlash == true;
      });
      this.flashPercent = Math.floor((flashes.length / this.climbs.length) * 100);
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  setSelectedAction(a: number) {
    if (this.selectedAction === a) {
      this.selectedAction = 0;
    } else {
      this.selectedAction = a;
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
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
    if (this.user.picture != null) {
      this.imageService.delete('users', this.user.userId, this.user.picture);
      this.user.picture = null;
      this.imageSrc = 'assets/img/defaultUser.jpg'
    }
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
