import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { BouldersComponent } from './Components/boulders/boulders.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  {path: "", redirectTo: "about", pathMatch: "full"},
  {path: "about", component: AboutComponent},
  {path: "boulders", component: BouldersComponent},
  {path: "user/:id", component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
