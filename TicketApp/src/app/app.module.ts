import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { FormsModule }   from '@angular/forms';  
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtModule } from "@auth0/angular-jwt";
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { TicketsDetailsComponent } from './home/tickets-details/tickets-details.component';
import { UserAccessComponent } from './home/user-access/user-access.component';
import { CommonService } from './common.service';
import { TicketViewComponent } from './home/ticket-view/ticket-view.component';
import { TicketStatusComponent } from './home/ticket-status/ticket-status.component';
import { NoAccessComponent } from './home/no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    DashboardComponent,
    TicketsDetailsComponent,
    UserAccessComponent,
    TicketViewComponent,
    TicketStatusComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('app-accessToken')
      }
    }),
    ModalModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [CommonService,BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
