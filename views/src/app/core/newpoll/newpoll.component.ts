import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MongoService } from '../../mongo.service';

@Component({
  selector: 'app-newpoll',
  templateUrl: './newpoll.component.html',
  styleUrls: ['./newpoll.component.css']
})
export class NewpollComponent implements OnInit {

  pollName: string;
  pollOptions: string[] = ['', ''];

  @ViewChild('f') form: NgForm;

  constructor(private mongoService: MongoService) { }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return index;
  }

  addOption() {
    this.pollOptions.push('');
  }

  onSubmit(form) {
    let opts = [];
    for(let opt of this.pollOptions){
      opts.push({
        name: opt,
        voteCount: 0
      });
    }
    let poll = {
      name: this.form.value.name,
      options: opts
    };
    this.mongoService.saveNewPoll(poll);
    this.form.reset();
  }

}
