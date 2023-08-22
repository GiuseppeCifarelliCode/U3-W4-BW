import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoWithPictureComponent } from './pages/profile/info-with-picture/info-with-picture.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:"",
    component: InfoWithPictureComponent,
    pathMatch:"full"
  },
  {
    path:'profile',
    component:InfoWithPictureComponent
  },
  {
    path:'home',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
