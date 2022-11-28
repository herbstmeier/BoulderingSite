import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserModel } from 'src/app/shared/models/user.model';
import { repeatPasswordValidator } from 'src/app/shared/directives/repeatPassword.directive';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z!-@]*')]],
    passwordRepeat: ['', Validators.required]
  }, {
    validators: repeatPasswordValidator
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router) { }

  submitRegister() {
    const username: string = this.registerForm.value.username ? this.registerForm.value.username : '';
    const password: string = this.registerForm.value.password ? this.registerForm.value.password : '';

    const newUser = new AuthUserModel(username, password);
    
    this.userService.create(newUser).subscribe({
      next: (data) => {
        if (data.registerError) {
          console.log(data.registerError);
        } else {
          console.log(`new user with userId ${data.id} was created.`);
          this.userService.setLoggedIn(data);
          this.router.navigateByUrl('');
        }
      }
    })
  }
}
