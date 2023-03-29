import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { UplaodedFilesComponent } from './uplaoded-files/uplaoded-files.component';
import { CharactersComponent } from './characters/characters.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { UniversitiesComponent } from './universities/universities.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';

const routes: Routes = [
  { path: 'register', component: RegistrationPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'uploaded-files', component: UplaodedFilesComponent },
      { path: 'characters', component: CharactersComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'uni', component: UniversitiesComponent },
      {
        path: 'announcement', component: AnnouncementComponent,
        //children:[{ path : 'edit-announcement/:id', component : EditAnnouncementComponent }]
      },
       { path : 'edit-announcement/:id', component : EditAnnouncementComponent },
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
      
    ],
  },
  // { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginPageComponent,RegistrationPageComponent,HomePageComponent,ProfileComponent,PageNotFoundComponent,DashboardComponent,CharactersComponent,ChangePasswordComponent,EditAnnouncementComponent,AnnouncementComponent,UniversitiesComponent,VehiclesComponent,UplaodedFilesComponent,];
