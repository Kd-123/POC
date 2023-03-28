import { NgModule } from '@angular/core';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { MatButtonModule } from '@angular/material';
// import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UplaodedFilesComponent } from './uplaoded-files/uplaoded-files.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {EncrDecrServiceService} from './services/encr-decr-service.service';
import { CharactersComponent } from './characters/characters.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UniversitiesComponent } from './universities/universities.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';
import { NgxConfirmBoxModule,NgxConfirmBoxService } from 'ngx-confirm-box';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomePageComponent,
    ProfileComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    UplaodedFilesComponent,
    ChangePasswordComponent,
    CharactersComponent,
    VehiclesComponent, 
    UniversitiesComponent, AnnouncementComponent, EditAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    NgxConfirmBoxModule,
    FormsModule,
    
    
    //NgConfirmModule,
    
    // MatIconModule,
    // MatButtonModule
  ],
  providers: [EncrDecrServiceService],
  bootstrap: [AppComponent],
  //entryComponents:[AnnouncementComponent]
})
export class AppModule { }
