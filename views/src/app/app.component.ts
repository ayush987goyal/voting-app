import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCPSY8OJTHgSAr1uXx3yBWhkcUnXuxP8mU",
      authDomain: "voting-app-177314.firebaseapp.com"
    });
  }
}
