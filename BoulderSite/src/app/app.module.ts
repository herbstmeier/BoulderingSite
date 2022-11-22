import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginButtonComponent } from './login-button';
import { LogoutButtonComponent } from './logout-button';
import { UserProfileComponent } from './user-profile';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev-0sdsnwcyj7vabquo.eu.auth0.com',
      clientId: 'MYrjbBmeu8WYRoS3U831DoKq6kQeVvEq'
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
