import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { BoulderCreateComponent } from './Components/boulders/boulder-create/boulder-create.component';
import { BoulderDetailsComponent } from './Components/boulders/boulder-details/boulder-details.component';
import { BouldersComponent } from './Components/boulders/boulders.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'boulders', component: BouldersComponent },
  { path: 'boulders/new', component: BoulderCreateComponent, pathMatch: 'full' },
  { path: 'boulders/:id', component: BoulderDetailsComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
