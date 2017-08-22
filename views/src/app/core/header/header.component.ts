import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {

  isValid: boolean;
  userFirstName: string;
  subscription: Subscription;

  constructor(private authService: AuthService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.authService.validityUpdated.subscribe(
      (obj: any) => {
        this.isValid = obj.isValid;
        this.userFirstName = obj.userFirstName;
        console.log(this.isValid);
        // this.ref.detectChanges();
      }
    );
    this.isValid = this.authService.isAuthenticated();
    this.userFirstName = this.authService.userFirstName;
    console.log(this.isValid);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("onChanges");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log("onDestroy");
  }

  onSignOut() {
    this.authService.onSignOut();
  }

}
