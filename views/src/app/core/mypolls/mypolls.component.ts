import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../mongo.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.component.html',
  styleUrls: ['./mypolls.component.css']
})
export class MypollsComponent implements OnInit {

  pollList = [];
  isLoading: boolean = false;

  constructor(private mongoService: MongoService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.mongoService.getPollsByUser(this.authService.userEmail).subscribe(
      (res) => {
        for (let item of res) {
          this.pollList.push({
            name: item["poll"].name,
            id: item._id
          });
        }
        this.isLoading = false;
      },
    (err) => {
      console.log(err);
      this.isLoading = false;
    }
    );
  }

  onClickPoll (index) {
    this.router.navigate(['/poll/' + this.pollList[index]['id']]);
  }

  onCreate() {
    this.router.navigate(['/newpoll']);
  }

}
