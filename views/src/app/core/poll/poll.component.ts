import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MongoService } from '../../mongo.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  id: string;
  poll: any;

  constructor(private router: Router, private route: ActivatedRoute, private mongoService: MongoService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.mongoService.getPollById(this.id).subscribe(
          (res) => {
            this.poll = res;
            console.log(this.poll);
          }
        );
      }
    );
  }

}
