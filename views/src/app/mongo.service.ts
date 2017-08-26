import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { AuthService } from './auth/auth.service';


@Injectable()
export class MongoService {

  constructor(private http: Http, private authService: AuthService) { }

  saveNewPoll(obj: any) {
    let pollData = {
      user: this.authService.userEmail,
      poll: obj,
      votedUsers: []
    };

    return this.http.post('/newpoll', pollData).map(
      (res) => { return res.json(); }
    );
  }

  getIp() {
    return this.http.get('/ip').map(
      (res) => {return res.json();}
    );
  }

  getAllPolls() {
    return this.http.get('/polls').map(
      (res) => { return res.json(); }
    );
  }

  getPollById(id) {
    return this.http.get('/polls/' + id).map(
      (res) => { return res.json(); }
    );
  }

  getPollsByUser(user) {
    return this.http.get('/pollsMy/' + user).map(
      (res) => { return res.json(); }
    )
  }

  updatePollById(poll) {
    return this.http.post('/pollsMy', poll).map(
      (res) => { return res.json(); }
    );
  }

  deletePollById(id) {
    return this.http.get('/pollDel/' + id).map(
      (res) => { return res.json(); }
    );
  }
}
