import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService) {}

  title = 'BoulderSite';
  public user$ = this.auth.user$;

  ngOnInit() {
    console.log(this.user$);
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ 
      returnTo: this.document.location.origin 
    });
  }
}
