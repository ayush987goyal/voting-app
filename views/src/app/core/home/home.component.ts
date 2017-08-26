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
  isLoading: boolean = false;

  constructor(private mongoService: MongoService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.mongoService.getAllPolls().subscribe(
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

}
