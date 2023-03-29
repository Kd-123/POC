import { NgModule } from '@angular/core';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { MatButtonModule } from '@angular/material';
// import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HomePageComponent } from './home-page/home-page.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {EncrDecrServiceService} from './services/encr-decr-service.service';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgxConfirmBoxModule} from 'ngx-confirm-box';
import { MatSlideToggleModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    
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
    MatSlideToggleModule,
    
    
    //NgConfirmModule,
    
    // MatIconModule,
    // MatButtonModule
  ],
  providers: [EncrDecrServiceService],
  bootstrap: [AppComponent],
  //entryComponents:[AnnouncementComponent]
})
export class AppModule { }
