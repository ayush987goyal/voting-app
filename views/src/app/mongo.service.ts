import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { AuthService } from './auth/auth.service';


@Injectable()
export class MongoService {

  constructor(private http: Http, private authService: AuthService) { }

  saveNewPoll(obj: any) {
    let pollData = {
      user: this.authService.userEmail,
      poll: obj
    };

    this.http.post('/newpoll', pollData).subscribe(
      (res) => {
        console.log(res["_body"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllPolls() {
    return this.http.get('/polls').map(
      (res) => {return res.json();}
    );
  }

  getPollById(id) {
    return this.http.get('/polls/' + id).map(
      (res) => {return res.json();}
    );
  }
}
