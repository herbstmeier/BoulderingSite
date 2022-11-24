import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutComponent } from './Components/about/about.component';
import { BouldersComponent } from './Components/boulders/boulders.component';
import { UserComponent } from './Components/user/user.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    SidebarComponent,
    AboutComponent,
    BouldersComponent,
    UserComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
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
