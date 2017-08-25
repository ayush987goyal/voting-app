import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../mongo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pollList = [];

  constructor(private mongoService: MongoService, private router: Router) { }

  ngOnInit() {
    this.mongoService.getAllPolls().subscribe(
      (res) => {
        for (let item of res) {
          this.pollList.push({
            name: item["poll"].name,
            id: item._id
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onClickPoll (index) {
    console.log(index);
    this.router.navigate(['/poll/' + this.pollList[index]['id']]);
  }

}
