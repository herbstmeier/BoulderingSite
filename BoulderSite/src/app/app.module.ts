import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AboutComponent } from './Components/about/about.component';
import { BouldersComponent } from './Components/boulders/boulders.component';
import { UserComponent } from './Components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Components/register/register.component';
import { httpInterceptorProviders } from './shared/interceptors';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { BoulderDetailsComponent } from './Components/boulders/boulder-details/boulder-details.component';
import { BoulderCreateComponent } from './Components/boulders/boulder-create/boulder-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AboutComponent,
    BouldersComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoulderDetailsComponent,
    BoulderCreateComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
