import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { NewpollComponent } from './core/newpoll/newpoll.component';
import { MypollsComponent } from './core/mypolls/mypolls.component';
import { PollComponent } from './core/poll/poll.component';
import { MongoService } from './mongo.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NewpollComponent,
    MypollsComponent,
    PollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    FormsModule,
    HttpModule
  ],
  providers: [MongoService],//, {provide: APP_BASE_HREF, useValue: '/polls'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
