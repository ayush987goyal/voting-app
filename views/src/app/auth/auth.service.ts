import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  isValid: boolean = false;
  userFirstName: string = '';
  userLastName: string = '';
  providerGoogle = new firebase.auth.GoogleAuthProvider();
  providerGithub = new firebase.auth.GithubAuthProvider();
  providerTwitter = new firebase.auth.TwitterAuthProvider();
  providerFacebook = new firebase.auth.FacebookAuthProvider();
  token: string;

  validityUpdated = new Subject<{}>();

  constructor(private http: Http, private router: Router) { }

  onSignInGoogle() {
    firebase.auth().signInWithPopup(this.providerGoogle).then((result) => {
      this.token = result.credential.accessToken;
      this.userFirstName = result.additionalUserInfo.profile.given_name;
      this.userLastName = result.additionalUserInfo.profile.family_name;
      // console.log(result.additionalUserInfo.profile);

      this.validityUpdated.next({
        isValid: this.isAuthenticated(),
        userFirstName: this.userFirstName,
        userLastName: this.userLastName
      });

      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    })
  }

  onSignInGithub() {
    firebase.auth().signInWithPopup(this.providerGithub).then((result) => {
      this.token = result.credential.accessToken;
      this.userFirstName = result.additionalUserInfo.profile.name;
      // this.userLastName = result.additionalUserInfo.profile.family_name;
      // console.log(result);

      this.validityUpdated.next({
        isValid: this.isAuthenticated(),
        userFirstName: this.userFirstName,
        userLastName: this.userLastName
      });

      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    })
  }

  onSignInTwitter() {
    firebase.auth().signInWithPopup(this.providerTwitter).then((result) => {
      this.token = result.credential.accessToken;
      // this.userFirstName = result.additionalUserInfo.profile.given_name;
      // this.userLastName = result.additionalUserInfo.profile.family_name;
      console.log(result);

      this.validityUpdated.next({
        isValid: this.isAuthenticated(),
        userFirstName: this.userFirstName,
        userLastName: this.userLastName
      });

      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    })
  }

  onSignInFacebook() {
    firebase.auth().signInWithPopup(this.providerFacebook).then((result) => {
      this.token = result.credential.accessToken;
      this.userFirstName = result.additionalUserInfo.profile.first_name;
      this.userLastName = result.additionalUserInfo.profile.last_name;
      console.log(result);

      this.validityUpdated.next({
        isValid: this.isAuthenticated(),
        userFirstName: this.userFirstName,
        userLastName: this.userLastName
      });

      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    })
  }

  onSignOut() {
    firebase.auth().signOut();
    this.token = null;
    this.validityUpdated.next({
      isValid: this.isAuthenticated(),
      userFirstName: this.userFirstName,
      userLastName: this.userLastName
    });

    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.token != null;
    // return true;
  }
}
