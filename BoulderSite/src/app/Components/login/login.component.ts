import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserModel } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z!-@]*')]]
  })
  showPassword: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router) { }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  submitLogin() {
    const username = this.loginForm.value.username ? this.loginForm.value.username : '';
    const password = this.loginForm.value.password ? this.loginForm.value.password : '';
    const user = new AuthUserModel(username, password);

    this.userService.login(user).subscribe({
      next: (data: { token: string, id: number, authLevel: number, expiresIn: number }) => {
        if (data.token) {
          this.userService.setLoggedIn(data);
          this.router.navigateByUrl('');
        } else {
          console.log('login failed.');
        }
      }
    });
  }
}