import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { MypollsComponent } from './core/mypolls/mypolls.component';
import { NewpollComponent } from './core/newpoll/newpoll.component';
import { PollComponent } from './core/poll/poll.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'mypolls', component: MypollsComponent, canActivate: [AuthGuard]},
  { path: 'newpoll', component: NewpollComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'poll/:id', component: PollComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
